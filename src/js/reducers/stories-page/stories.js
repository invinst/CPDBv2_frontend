import { handleActions } from 'redux-actions';
import { find } from 'lodash';

import {
  STORIES_REQUEST_SUCCESS, STORIES_REQUEST_FAILURE,
  LOAD_MORE_STORIES_REQUEST_SUCCESS, UPDATE_STORY_REQUEST_SUCCESS
} from 'actions/stories-page';


const stories = handleActions({
  [STORIES_REQUEST_SUCCESS]: (state, action) => (
    action.payload.results
  ),
  [STORIES_REQUEST_FAILURE]: (state, action) => (
    []
  ),
  [LOAD_MORE_STORIES_REQUEST_SUCCESS]: (state, action) => (
    state.concat(action.payload.results)
  ),
  [UPDATE_STORY_REQUEST_SUCCESS]: (state, action) => {
    const updatedStory = find(state, story => story.id === action.payload.id);
    updatedStory.fields = action.payload.fields;
    return [...state];
  }
}, []);

export default stories;
