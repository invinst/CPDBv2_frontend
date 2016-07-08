import { combineReducers } from 'redux';

import featuredStories from './featured-stories';
import nonFeaturedStories from './non-featured-stories';


export default combineReducers({
  featuredStories,
  nonFeaturedStories
});
