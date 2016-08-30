import { combineReducers } from 'redux';

import stories from './stories';
import isRequesting from './is-requesting';


const storyApp = combineReducers({
  stories,
  isRequesting
});

export default storyApp;
