import * as _ from 'lodash';

import { ADD_ITEM_TO_PINBOARD } from 'utils/constants';
import { getPinboard } from 'selectors/pinboard';
import { createPinboard, updatePinboard } from 'actions/pinboard';

const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'DATE > CR': 'crids',
  'INVESTIGATOR > CR': 'crids',
  'OFFICER': 'officerIds',
  'UNIT > OFFICERS': 'officerIds',
  'DATE > OFFICERS': 'officerIds',
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
  return next(action);
};
