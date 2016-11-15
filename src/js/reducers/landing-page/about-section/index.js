import { combineReducers } from 'redux';

import fields from './fields';
import editModeOn from './edit-mode-on';


const aboutSection = combineReducers({
  fields,
  editModeOn
});

export default aboutSection;
