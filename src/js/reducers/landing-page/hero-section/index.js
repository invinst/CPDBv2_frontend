import { combineReducers } from 'redux';

import fields from './fields';
import editModeOn from './edit-mode-on';


const heroSection = combineReducers({
  fields,
  editModeOn
});

export default heroSection;
