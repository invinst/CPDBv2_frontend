import { handleActions } from 'redux-actions';
import { filter } from 'lodash';

import {
  HANDLE_REMOVING_ITEM_IN_PINBOARD_PAGE,
  REMOVE_ITEM_FROM_PINBOARD_STATE,
  ADD_ITEM_TO_PINBOARD_STATE,
} from 'utils/constants';


export default handleActions({
  [HANDLE_REMOVING_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'OFFICER'
      && currentItems.indexOf(id) === -1) {
      return [...currentItems, action.payload.id];
    }
    return currentItems;
  },
  [REMOVE_ITEM_FROM_PINBOARD_STATE]: (state, action) => {
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
}, []);
