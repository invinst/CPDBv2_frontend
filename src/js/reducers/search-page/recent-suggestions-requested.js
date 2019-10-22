import { handleActions } from 'redux-actions';

import {
  FETCH_RECENT_SEARCH_ITEMS_START,
  FETCH_RECENT_SEARCH_ITEMS_SUCCESS,
  FETCHED_EMPTY_RECENT_SEARCH_ITEMS,
} from 'utils/constants';


export default handleActions({
  [FETCH_RECENT_SEARCH_ITEMS_START]: (state, action) => (false),
  [FETCH_RECENT_SEARCH_ITEMS_SUCCESS]: (state, action) => (true),
  [FETCHED_EMPTY_RECENT_SEARCH_ITEMS]: (state, action) => (true),
}, false);
