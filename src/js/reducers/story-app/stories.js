import { List } from 'immutable';
import { handleActions } from 'redux-actions';

import { STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE } from 'actions/story-app';


const stories = handleActions({
  [STORIES_REQUEST_SUCCESS]: (state, action) => (
    List(action.payload)
  ),
  [STORIES_REQUEST_FAILURE]: (state, action) => (
    state.clear()
  )
}, List([]));

export default stories;
