import { handleActions } from 'redux-actions';
import { find, slice, includes } from 'lodash';

import {
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  SEARCH_SAVE_TO_RECENT,
  PINNED_ITEM_TYPES,
} from 'utils/constants';

const FETCHED_RECENT_SUGGESTION_TYPES = ['CR', 'OFFICER', 'TRR'];

const matchRecentItem = (item, recentItem) => {
  return item.type === recentItem.type && String(item.id) === String(recentItem.id);
};

export default handleActions({
  [SEARCH_SAVE_TO_RECENT]: (state, action) => {
    const recentItem = action.payload;
    recentItem.type = PINNED_ITEM_TYPES[recentItem.type] || recentItem.type;

    const newData = (state || []).filter((item) => !matchRecentItem(item, recentItem));
    newData.unshift(recentItem);
    return slice(newData, 0, 10);
  },
  [FETCH_RECENT_SEARCH_ITEMS_SUCCESS]: (state, action) => {
    return state.map((recentItem) => {
      if (includes(FETCHED_RECENT_SUGGESTION_TYPES, recentItem.type)) {
        recentItem.data = find(action.payload, (item) => matchRecentItem(item, recentItem));
      }
      return recentItem;
    });
  },
}, []);
