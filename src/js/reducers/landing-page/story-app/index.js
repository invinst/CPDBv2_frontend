import { combineReducers } from 'redux';

import stories from './stories';
import isRequesting from './is-requesting';
import featuredStoryId from './featured-story-id';


const storyApp = combineReducers({
  stories,
  isRequesting,
  featuredStoryId
});

export default storyApp;
