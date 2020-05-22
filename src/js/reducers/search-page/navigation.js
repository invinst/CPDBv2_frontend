import { handleActions } from 'redux-actions';

import {
  SEARCH_NAVIGATION_DOWN,
  SEARCH_NAVIGATION_UP,
  SEARCH_NAVIGATION_RESET,
  SEARCH_NAVIGATION_SET,
} from 'utils/constants';


export default handleActions({
  [SEARCH_NAVIGATION_RESET]: ({ itemIndex }, action) => {
    const newItemIndex = action.payload === undefined ? 1 : action.payload;
    return { itemIndex: newItemIndex };
  },

  [SEARCH_NAVIGATION_DOWN]: ({ itemIndex }, action) => {
    const { totalItemCount } = action.payload;
    const newItemIndex = itemIndex < totalItemCount - 1 ? itemIndex + 1 : itemIndex;

    return {
      'itemIndex': newItemIndex,
    };
  },

  [SEARCH_NAVIGATION_UP]: ({ itemIndex }, action) => {
    const newItemIndex = itemIndex > 0 ? itemIndex - 1 : itemIndex;

    return {
      'itemIndex': newItemIndex,
    };
  },

  [SEARCH_NAVIGATION_SET]: (state, action) => ({ itemIndex: action.payload.itemIndex }),
}, {
  'itemIndex': 0,
});
