import { handleActions } from 'redux-actions';
import { filter } from 'lodash';

import {
  REMOVE_ITEM_FROM_PINBOARD_STATE,
  COMPLETE_REMOVE_ITEM_FROM_PINBOARD,
  ADD_ITEM_TO_PINBOARD_STATE,
  LOCATION_CHANGE,
} from 'utils/constants';


export default handleActions({
  [REMOVE_ITEM_FROM_PINBOARD_STATE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'OFFICER'
      && currentItems.indexOf(id) === -1) {
      return [...currentItems, action.payload.id];
    }
    return currentItems;
  },
  [COMPLETE_REMOVE_ITEM_FROM_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'OFFICER') {
      return filter(currentItems, item => item !== id);
    }

    return currentItems;
  },
  [ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'OFFICER') {
      return filter(currentItems, item => item !== id);
    }

    return currentItems;
  },
  [LOCATION_CHANGE]: (state, action) => [],
}, []);
