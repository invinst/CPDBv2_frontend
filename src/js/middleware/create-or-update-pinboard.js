import * as _ from 'lodash';

import {
  ADD_ITEM_TO_PINBOARD,
  PINBOARD_CREATE_REQUEST_SUCCESS,
  PINBOARD_UPDATE_REQUEST_SUCCESS
} from 'utils/constants';
import { getPinboard } from 'selectors/pinboard';
import {
  createPinboard,
  updatePinboard,
  fetchPinboard,
  fetchPinboardSocialGraph,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints
} from 'actions/pinboard';
import { browserHistory } from 'react-router';

const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'DATE > CR': 'crids',
  'INVESTIGATOR > CR': 'crids',
  'OFFICER': 'officerIds',
  'UNIT > OFFICERS': 'officerIds',
  'DATE > OFFICERS': 'officerIds',
  'TRR': 'trrIds',
  'DATE > TRR': 'trrIds',
};


const addItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  pinboard[key].push(item.id);
  return pinboard;
};

const removeItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  _.remove(pinboard[key], (id) => (id === item.id));
  return pinboard;
};

export default store => next => action => {
  if (action.type === ADD_ITEM_TO_PINBOARD) {
    let pinboard = getPinboard(store.getState());
    let item = action.payload;

    if (pinboard.id === null) {
      store.dispatch(createPinboard(addItem(pinboard, item)));
    } else {
      const newPinboard = item.isPinned ? removeItem(pinboard, item) : addItem(pinboard, item);
      const pinboardAction = pinboard.ownedByCurrentUser ? updatePinboard : createPinboard;

      store.dispatch(pinboardAction(newPinboard));
    }
  }
  if (action.type === PINBOARD_CREATE_REQUEST_SUCCESS) {
    const state = store.getState();
    if (state.pathname.match(/\/pinboard\/[\w\d]+/)) {
      browserHistory.push(`/pinboard/${action.payload.id}/`);
    }
  }
  if (action.type === PINBOARD_UPDATE_REQUEST_SUCCESS) {
    const state = store.getState();
    if (state.pathname.match(/\/pinboard\/[\w\d]+/)) {
      const pinboardID = action.payload.id;
      store.dispatch(fetchPinboard(pinboardID));
      store.dispatch(fetchPinboardSocialGraph(pinboardID));
      store.dispatch(fetchPinboardRelevantDocuments(pinboardID));
      store.dispatch(fetchPinboardRelevantCoaccusals(pinboardID));
      store.dispatch(fetchPinboardRelevantComplaints(pinboardID));
    }
  }
  return next(action);
};
