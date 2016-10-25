import { combineReducers } from 'redux';

import reports from './reports';
import isRequesting from './is-requesting';
import fields from './fields';
import editModeOn from './edit-mode-on';


const storyApp = combineReducers({
  isRequesting,
  fields,
  editModeOn,
  reports
});

export default storyApp;
