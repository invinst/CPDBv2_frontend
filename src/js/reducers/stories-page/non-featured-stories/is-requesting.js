import { handleActions } from 'redux-actions';

import {
  NON_FEATURED_STORIES_REQUEST_START, NON_FEATURED_STORIES_REQUEST_SUCCESS, NON_FEATURED_STORIES_REQUEST_FAILURE
} from 'actions/stories-page/non-featured-stories';


export default handleActions({
  [NON_FEATURED_STORIES_REQUEST_START]: (state, action) => (true),
  [NON_FEATURED_STORIES_REQUEST_SUCCESS]: (state, action) => (false),
  [NON_FEATURED_STORIES_REQUEST_FAILURE]: (state, action) => (false)
}, false);
