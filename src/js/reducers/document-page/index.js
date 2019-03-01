import { combineReducers } from 'redux';

import data from './data';
import titleEditModeOn from './title-edit-mode-on';
import textContentEditModeOn from './text-content-edit-mode-on';


export default combineReducers({
  data,
  titleEditModeOn,
  textContentEditModeOn,
});
