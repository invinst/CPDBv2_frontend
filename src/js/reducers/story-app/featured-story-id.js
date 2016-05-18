import { handleActions } from 'redux-actions';

import { STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';


export default handleActions({
  [STORIES_REQUEST_SUCCESS]: (state, action) => (action.payload['feature_story_id']),
  [STORIES_REQUEST_FAILURE]: (state, action) => (0)
}, 0);
