import { handleActions } from 'redux-actions';

import {
  SEARCH_NAVIGATION_DOWN, SEARCH_NAVIGATION_UP, SEARCH_NAVIGATION_RESET,
  CHANGE_SEARCH_QUERY
} from 'utils/constants';


export default handleActions({
  [SEARCH_NAVIGATION_RESET]: ({ itemIndex }, action) => {
    const newItemIndex = action.payload === undefined ? 1 : action.payload;
    return { itemIndex: newItemIndex };
  },

  [CHANGE_SEARCH_QUERY]: () => ({ itemIndex: 1 }),

  [SEARCH_NAVIGATION_DOWN]: ({ itemIndex }, action) => {
    const { totalItemCount } = action.payload;
    const newItemIndex = itemIndex < totalItemCount - 1 ? itemIndex + 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  },

  [SEARCH_NAVIGATION_UP]: ({ itemIndex }, action) => {
    const newItemIndex = itemIndex > 0 ? itemIndex - 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  }
}, {
  'itemIndex': 0
});
