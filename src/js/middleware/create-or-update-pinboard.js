import * as _ from 'lodash';

import { ADD_ITEM_TO_PINBOARD } from 'utils/constants';
import { getPinboard } from 'selectors/pinboard';
import { createPinboard, updatePinboard } from 'actions/pinboard';

const PINBOARD_ATTR_MAP = {
  'CR': 'crids',
  'OFFICER': 'officerIds'
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
    } else if (item.isPinned) {
      store.dispatch(updatePinboard(removeItem(pinboard, item)));
    } else {
      store.dispatch(updatePinboard(addItem(pinboard, item)));
    }
  }
  return next(action);
};
