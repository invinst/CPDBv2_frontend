import { combineReducers } from 'redux';

import stories from './stories';
import selectedStory from './selected-story';
import isRequesting from './is-requesting';


const storyApp = combineReducers({
  stories,
  selectedStory,
  isRequesting
});

export default storyApp;
