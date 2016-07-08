import { handleActions } from 'redux-actions';

import {
  FEATURED_STORIES_REQUEST_START, FEATURED_STORIES_REQUEST_SUCCESS, FEATURED_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/featured-stories';


export default handleActions({
  [FEATURED_STORIES_REQUEST_START]: (state, action) => (true),
  [FEATURED_STORIES_REQUEST_SUCCESS]: (state, action) => (false),
  [FEATURED_STORIES_REQUEST_FAILURE]: (state, action) => (false)
}, false);
