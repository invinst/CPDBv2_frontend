import { handleActions } from 'redux-actions';

import {
  STORIES_PAGE_REQUEST_START, STORIES_PAGE_REQUEST_SUCCESS, STORIES_PAGE_REQUEST_FAILURE
} from 'actions/stories-page';


export default handleActions({
  [STORIES_PAGE_REQUEST_START]: (state, action) => (true),
  [STORIES_PAGE_REQUEST_SUCCESS]: (state, action) => (false),
  [STORIES_PAGE_REQUEST_FAILURE]: (state, action) => (false)
}, false);
