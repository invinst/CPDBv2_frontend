import { combineReducers } from 'redux';

import stories from './stories';
import isRequesting from './is-requesting';
import fields from './fields';
import editModeOn from './edit-mode-on';


const storyApp = combineReducers({
  stories,
  isRequesting,
  fields,
  editModeOn
});

export default storyApp;
