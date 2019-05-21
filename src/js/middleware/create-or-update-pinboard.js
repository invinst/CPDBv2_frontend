import { Promise } from 'es6-promise';
import * as _ from 'lodash';

import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  SAVE_PINBOARD,
} from 'utils/constants';
import {
  createPinboard,
  updatePinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  addItemToPinboardState,
  removeItemFromPinboardState,
  orderPinboardState,
  savePinboard,
} from 'actions/pinboard';
import { showToast } from 'actions/toast';


const getRequestPinboard = pinboard => ({
  id: _.get(pinboard, 'id', null),
  title: _.get(pinboard, 'title', ''),
  officerIds: _.map(_.get(pinboard, 'officer_ids', []), id => (id.toString())),
  crids: _.get(pinboard, 'crids', []),
  trrIds: _.map(_.get(pinboard, 'trr_ids', []), id => (id.toString())),
  description: _.get(pinboard, 'description', ''),
});

const MAX_RETRIES = 60;
const RETRY_DELAY = 1000;
let retries = 0;

function dispatchUpdateOrCreatePinboard(store, currentPinboard) {
  const updateOrCreatePinboard = (currentPinboard.id === null) ? createPinboard : updatePinboard;
  store.dispatch(updateOrCreatePinboard(currentPinboard)).then(result => {
    retries = 0;
    store.dispatch(savePinboard(result.payload));
  }).catch(() => {
    if (retries < MAX_RETRIES) {
      retries += 1;
      setTimeout(() => store.dispatch(savePinboard()), RETRY_DELAY);
    }
  });
}

export default store => next => action => {
  if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD || action.type === ADD_ITEM_IN_PINBOARD_PAGE) {
    let promises = [];

    const addOrRemove = action.payload.isPinned ? removeItemFromPinboardState : addItemToPinboardState;
    promises.push(store.dispatch(addOrRemove(action.payload)));

    if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD) {
      promises.push(store.dispatch(showToast(action.payload)));
    }

    Promise.all(promises).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === REMOVE_ITEM_IN_PINBOARD_PAGE) {
    Promise.all([store.dispatch(removeItemFromPinboardState(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === ORDER_PINBOARD) {
    Promise.all([store.dispatch(orderPinboardState(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === SAVE_PINBOARD) {
    const state = store.getState();
    const pinboard = state.pinboardPage.pinboard;
    const currentPinboard = getRequestPinboard(pinboard);
    const pinboardId = currentPinboard.id;

    if (!pinboard.saving) {
      const savedPinboard = getRequestPinboard(action.payload);

      if (_.isEmpty(action.payload) || !_.isEqual(currentPinboard, savedPinboard)) {
        dispatchUpdateOrCreatePinboard(store, currentPinboard);
      } else {
        if (_.startsWith(state.pathname, '/pinboard/') && pinboardId) {
          store.dispatch(fetchPinboardSocialGraph(pinboardId));
          store.dispatch(fetchPinboardGeographicData(pinboardId));
          store.dispatch(fetchPinboardRelevantDocuments(pinboardId));
          store.dispatch(fetchPinboardRelevantCoaccusals(pinboardId));
          store.dispatch(fetchPinboardRelevantComplaints(pinboardId));
        }
      }
    }
  }

  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState();
    const pinboard = state.pinboardPage.pinboard;
    if (pinboard.saving) {
      const currentPinboard = getRequestPinboard(pinboard);
      dispatchUpdateOrCreatePinboard(store, currentPinboard);
    }
  }

  return next(action);
};
