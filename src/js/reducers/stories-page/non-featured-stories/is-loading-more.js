import { handleActions } from 'redux-actions';

import {
  LOAD_MORE_STORIES_REQUEST_START, LOAD_MORE_STORIES_REQUEST_SUCCESS, LOAD_MORE_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';


export default handleActions({
  [LOAD_MORE_STORIES_REQUEST_START]: (state, action) => (true),
  [LOAD_MORE_STORIES_REQUEST_SUCCESS]: (state, action) => (false),
  [LOAD_MORE_STORIES_REQUEST_FAILURE]: (state, action) => (false)
}, false);
