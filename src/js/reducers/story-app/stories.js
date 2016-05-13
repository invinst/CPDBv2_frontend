import { handleActions } from 'redux-actions';

import { STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';


const stories = handleActions({
  [STORIES_REQUEST_SUCCESS]: (state, action) => (
    action.payload.stories
  ),
  [STORIES_REQUEST_FAILURE]: (state, action) => (
    []
  )
}, []);

export default stories;
