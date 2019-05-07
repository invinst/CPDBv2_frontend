import * as _ from 'lodash';

import {
  ADD_OR_REMOVE_ITEM_IN_PINBOARD,
  REMOVE_ITEM_IN_PINBOARD_PAGE,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
} from 'utils/constants';
import { getPinboard } from 'selectors/pinboard';
import {
  createPinboard,
  updatePinboard,
  fetchPinboardSocialGraph,
  fetchPinboardGeographicData,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  updatePinboardOrder,
} from 'actions/pinboard';

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

const PINBOARD_FETCH_SELECTED_MAP = {
  'CR': fetchPinboardComplaints,
  'DATE > CR': fetchPinboardComplaints,
  'INVESTIGATOR > CR': fetchPinboardComplaints,
  'OFFICER': fetchPinboardOfficers,
  'UNIT > OFFICERS': fetchPinboardOfficers,
  'DATE > OFFICERS': fetchPinboardOfficers,
  'TRR': fetchPinboardTRRs,
  'DATE > TRR': fetchPinboardTRRs,
};

const debouncedReorderOrCreatePinboard = _.debounce(
  (store, payload) => {
    const pinboard = getPinboard(store.getState());
    const pinboardAction = (pinboard.id === null) ? createPinboard : updatePinboardOrder;
    store.dispatch(pinboardAction({
      ..._.pick(pinboard, ['id', 'title', 'description', 'officerIds', 'crids', 'trrIds']),
      ...payload
    }));
  },
  100
);

const addItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  pinboard[key].push(item.id);
};

const removeItem = (pinboard, item) => {
  const key = PINBOARD_ATTR_MAP[item.type];
  _.remove(pinboard[key], (id) => (id === item.id));
};

export default store => next => action => {
  let pinboard = null;
  let item = null;

  if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD ||
    action.type === REMOVE_ITEM_IN_PINBOARD_PAGE ||
    action.type === ADD_ITEM_IN_PINBOARD_PAGE) {
    pinboard = getPinboard(store.getState());
    item = action.payload;

    item.isPinned ? removeItem(pinboard, item) : addItem(pinboard, item);
  }

  if (action.type === ADD_OR_REMOVE_ITEM_IN_PINBOARD) {
    if (pinboard.id === null) {
      store.dispatch(createPinboard(pinboard));
    } else {
      store.dispatch(updatePinboard(pinboard));
    }
  }
  else if (action.type === REMOVE_ITEM_IN_PINBOARD_PAGE ||
    action.type === ADD_ITEM_IN_PINBOARD_PAGE) {
    // TODO: test this async function
    /* istanbul ignore next */
    store.dispatch(updatePinboard(pinboard)).then(response => {
      const pinboardID = response.payload.id;
      const pinboardFetchSelected = PINBOARD_FETCH_SELECTED_MAP[item.type];

      store.dispatch(pinboardFetchSelected(pinboardID));
      store.dispatch(fetchPinboardSocialGraph(pinboardID));
      store.dispatch(fetchPinboardGeographicData(pinboardID));
      store.dispatch(fetchPinboardRelevantDocuments(pinboardID));
      store.dispatch(fetchPinboardRelevantCoaccusals(pinboardID));
      store.dispatch(fetchPinboardRelevantComplaints(pinboardID));
    });
  }

  if (action.type === ORDER_PINBOARD) {
    debouncedReorderOrCreatePinboard(store, action.payload);
  }

  return next(action);
};
