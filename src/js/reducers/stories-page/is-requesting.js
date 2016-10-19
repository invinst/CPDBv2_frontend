import { handleActions } from 'redux-actions';

import {
  STORIES_REQUEST_START, STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE
} from 'actions/stories-page';


export default handleActions({
  [STORIES_REQUEST_START]: (state, action) => (true),
  [STORIES_REQUEST_SUCCESS]: (state, action) => (false),
  [STORIES_REQUEST_FAILURE]: (state, action) => (false)
}, false);
