import { handleActions } from 'redux-actions';
import { indexOf } from 'lodash';

import {
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERMS_NAVIGATION_RESET,
  SEARCH_TERMS_NAVIGATION_SET,
  SEARCH_TERMS_NAVIGATION_UP,
} from 'utils/constants';


export default handleActions({
  [SEARCH_TERMS_NAVIGATION_RESET]: () => 1,

  [SEARCH_TERMS_NAVIGATION_DOWN]: (itemIndex, action) => {
    const { totalItemCount } = action.payload;
    return itemIndex < totalItemCount - 1 ? itemIndex + 1 : itemIndex;
  },

  [SEARCH_TERMS_NAVIGATION_UP]: (itemIndex, action) => itemIndex > 0 ? itemIndex - 1 : itemIndex,

  [SEARCH_TERMS_NAVIGATION_SET]: (itemIndex, action) => {
    const { navigationKeys, uniqueKey } = action.payload;
    return indexOf(navigationKeys, uniqueKey);
  },
}, 0);
