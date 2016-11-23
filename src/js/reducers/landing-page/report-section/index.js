import { combineReducers } from 'redux';

import reports from './reports';
import fields from './fields';
import editModeOn from './edit-mode-on';


const storyApp = combineReducers({
  fields,
  editModeOn,
  reports
});

export default storyApp;
