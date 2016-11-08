import { combineReducers } from 'redux';

import fields from './fields';
import editModeOn from './edit-mode-on';


const vftgSection = combineReducers({
  fields,
  editModeOn
});

export default vftgSection;
