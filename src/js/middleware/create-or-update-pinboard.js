import { Promise } from 'es6-promise';
import * as _ from 'lodash';
import pluralize from 'pluralize';
import { Toastify } from 'utils/vendors';

import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  SAVE_PINBOARD,
  UPDATE_PINBOARD_INFO,
  PINBOARD_ITEM_REMOVE_MODE,
  SAVE_PINBOARD_WITHOUT_CHANGING_STATE,
  PINBOARD_CREATE_REQUEST_SUCCESS,
} from 'utils/constants';
import {
  createPinboard,
  updatePinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographic,
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchOtherPagesPinboardGeographicCrs,
  fetchOtherPagesPinboardGeographicTrrs,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  addItemToPinboardState,
  removeItemFromPinboardState,
  orderPinboardState,
  updatePinboardInfoState,
  savePinboard,
  savePinboardWithoutChangingState,
  performFetchPinboardRelatedData,
  handleRemovingItemInPinboardPage,
} from 'actions/pinboard';
import { showToast } from 'actions/toast';
import loadPaginatedData from 'utils/load-paginated-data';

const getIds = (query, key) => _.get(query, key, '').split(',').filter(_.identity);
const getPinboardFromQuery = (query) => ({
  'officerIds': getIds(query, 'officer-ids').map(id => parseInt(id)),
  'crids': getIds(query, 'crids'),
  'trrIds': getIds(query, 'trr-ids').map(id => parseInt(id)),
});

const getRequestPinboard = (state, pinboard=undefined) => {
  if (pinboard === undefined) {
    pinboard = state.pinboardPage.pinboard;
  }

  const removingItems = {
    officerItems: _.get(state, 'pinboardPage.officerItems.removingItems', []),
    crItems: _.get(state, 'pinboardPage.crItems.removingItems', []),
    trrItems: _.get(state, 'pinboardPage.trrItems.removingItems', []),
  };

  const transformPinboard = {
    id: _.get(pinboard, 'id', null),
    title: _.get(pinboard, 'title', ''),
    officerIds: _.map(_.get(pinboard, 'officer_ids', []), id => (id.toString())),
    crids: _.get(pinboard, 'crids', []),
    trrIds: _.map(_.get(pinboard, 'trr_ids', []), id => (id.toString())),
    description: _.get(pinboard, 'description', ''),
  };

  transformPinboard.officerIds = _.filter(transformPinboard.officerIds,
    id => removingItems.officerItems.indexOf(id) === -1);
  transformPinboard.crids = _.filter(transformPinboard.crids,
    id => removingItems.crItems.indexOf(id) === -1);
  transformPinboard.trrIds = _.filter(transformPinboard.trrIds,
    id => removingItems.trrItems.indexOf(id) === -1);

  return transformPinboard;
};

const MAX_RETRIES = 60;
const RETRY_DELAY = 1000;
let retries = 0;

function dispatchUpdateOrCreatePinboard(store, currentPinboard) {
  const updateOrCreatePinboard = _.isNil(currentPinboard.id) ? createPinboard : updatePinboard;
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

function dispatchFetchPinboardPageData(store, pinboardId) {
  store.dispatch(performFetchPinboardRelatedData());
  store.dispatch(fetchPinboardSocialGraph(pinboardId));
  store.dispatch(fetchPinboardGeographic());
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicCrs,
    fetchOtherPagesPinboardGeographicCrs,
    store,
  );
  loadPaginatedData(
    { 'pinboard_id': pinboardId },
    fetchFirstPagePinboardGeographicTrrs,
    fetchOtherPagesPinboardGeographicTrrs,
    store,
  );
  store.dispatch(fetchPinboardRelevantDocuments(pinboardId));
  store.dispatch(fetchPinboardRelevantCoaccusals(pinboardId));
  store.dispatch(fetchPinboardRelevantComplaints(pinboardId));
}


function formatMessage(foundIds, notFoundIds, itemType) {
  let message = '';
  if (!notFoundIds.length)
    return '';

  if (foundIds.length) {
    const totalString = pluralize(itemType, foundIds.length + notFoundIds.length, true);
    message += ` ${ foundIds.length } out of ${ totalString } were added to this pinboard.`;
  }

  const totalString = pluralize(`${itemType} ID`, foundIds.length + notFoundIds.length, true);
  message += ` ${ notFoundIds.length } out of ${ totalString } could not be recognized (${notFoundIds.join(', ')}).`;
  return message.trim();
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
    const { mode } = action.payload;
    switch (mode) {
      case PINBOARD_ITEM_REMOVE_MODE.API_ONLY:
        store.dispatch(handleRemovingItemInPinboardPage(action.payload));
        store.dispatch(savePinboardWithoutChangingState(action.payload));
        break;
      case PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY:
        store.dispatch(removeItemFromPinboardState(action.payload));
        break;
      default:
        Promise.all([store.dispatch(removeItemFromPinboardState(action.payload))]).finally(() => {
          store.dispatch(savePinboard());
        });
        break;
    }
  }

  if (action.type === UPDATE_PINBOARD_INFO) {
    Promise.all([store.dispatch(updatePinboardInfoState(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === ORDER_PINBOARD) {
    Promise.all([store.dispatch(orderPinboardState(action.payload))]).finally(() => {
      store.dispatch(savePinboard());
    });
  }

  if (action.type === SAVE_PINBOARD_WITHOUT_CHANGING_STATE) {
    const state = store.getState();
    const pinboard = getRequestPinboard(state);

    store.dispatch(updatePinboard(pinboard)).then(result => {
      dispatchFetchPinboardPageData(store, result.payload.id);
    });
  }

  if (action.type === SAVE_PINBOARD) {
    const state = store.getState();
    const pinboard = state.pinboardPage.pinboard;

    const currentPinboard = getRequestPinboard(state);
    const pinboardId = currentPinboard.id;

    if (!pinboard.saving) {
      const savedPinboard = getRequestPinboard(state, action.payload);

      if (_.isEmpty(action.payload) || !_.isEqual(currentPinboard, savedPinboard)) {
        dispatchUpdateOrCreatePinboard(store, currentPinboard);
      } else {
        if (_.startsWith(state.pathname, '/pinboard/') && pinboardId && pinboard.needRefreshData) {
          dispatchFetchPinboardPageData(store, pinboardId);
        }
      }
    }
  }

  if (action.type === '@@router/LOCATION_CHANGE') {
    const state = store.getState();
    const pinboard = state.pinboardPage.pinboard;
    if (pinboard.saving) {
      const currentPinboard = getRequestPinboard(state);
      dispatchUpdateOrCreatePinboard(store, currentPinboard);
    }

    const hasQuery = action.payload.query && !_.isEmpty(action.payload.query);
    if (_.isNil(pinboard.id) && hasQuery) {
      dispatchUpdateOrCreatePinboard(store, getPinboardFromQuery(action.payload.query));
    }
  }

  if (action.type === PINBOARD_CREATE_REQUEST_SUCCESS) {
    const foundOfficerIds = _.get(action.payload, 'officer_ids', []);
    const foundCrids = _.get(action.payload, 'crids', []);
    const foundTrrIds = _.get(action.payload, 'trr_ids', []);

    const notFoundOfficerIds = _.get(action.payload, 'not_found_items.officer_ids', []);
    const notFoundCrids = _.get(action.payload, 'not_found_items.crids', []);
    const notFoundTrrIds = _.get(action.payload, 'not_found_items.trr_ids', []);

    const creatingMessages = [];
    creatingMessages.push(formatMessage(foundOfficerIds, notFoundOfficerIds, 'officer'));
    creatingMessages.push(formatMessage(foundCrids, notFoundCrids, 'allegation'));
    creatingMessages.push(formatMessage(foundTrrIds, notFoundTrrIds, 'TRR'));

    const TopRightTransition = Toastify.cssTransition({
      enter: 'toast-enter',
      exit: 'toast-exit',
      duration: 500,
      appendPosition: true,
    });
    creatingMessages.filter(_.identity).forEach(message =>
      Toastify.toast(message, {
        className: 'toast-wrapper',
        bodyClassName: 'toast-body',
        transition: TopRightTransition,
        autoClose: 5000,
      })
    );
  }

  return next(action);
};
