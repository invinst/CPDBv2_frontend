import { combineReducers } from 'redux';

import fields from './fields';
import editModeOn from './edit-mode-on';


const collaborateSection = combineReducers({
  fields,
  editModeOn
});

export default collaborateSection;
