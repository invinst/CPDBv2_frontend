import { handleActions } from 'redux-actions';
import { indexOf } from 'lodash';

import {
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERMS_NAVIGATION_RESET,
  SEARCH_TERMS_NAVIGATION_SET,
  SEARCH_TERMS_NAVIGATION_UP,
} from 'utils/constants';


export default handleActions({
  [SEARCH_TERMS_NAVIGATION_RESET]: ({ itemIndex }, action) => {
    const newItemIndex = action.payload === undefined ? 1 : action.payload;
    return { itemIndex: newItemIndex };
  },

  [SEARCH_TERMS_NAVIGATION_DOWN]: ({ itemIndex }, action) => {
    const { totalItemCount } = action.payload;
    const newItemIndex = itemIndex < totalItemCount - 1 ? itemIndex + 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  },

  [SEARCH_TERMS_NAVIGATION_UP]: ({ itemIndex }, action) => {
    const newItemIndex = itemIndex > 0 ? itemIndex - 1 : itemIndex;

    return {
      'itemIndex': newItemIndex
    };
  },

  [SEARCH_TERMS_NAVIGATION_SET]: ({ itemIndex }, action) => {
    const { navigationKeys, uniqueKey } = action.payload;
    const newItemIndex = indexOf(navigationKeys, uniqueKey);
    return {
      'itemIndex': newItemIndex
    };
  },
}, {
  'itemIndex': 0
});
