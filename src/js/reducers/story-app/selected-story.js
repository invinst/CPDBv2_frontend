import { handleActions } from 'redux-actions';

import { SELECT_STORY } from 'actions/story-app';


const selectedStory = handleActions({
  [SELECT_STORY]: (state, action) => (action.payload)
}, 0);

export default selectedStory;
