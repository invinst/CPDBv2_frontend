import { combineReducers } from 'redux';

import data from './data';
import titleEditModeOn from './title-edit-mode-on';
import tagsEditModeOn from './tags-edit-mode-on';
import textContentEditModeOn from './text-content-edit-mode-on';
import tagsErrorMessages from './tags-error-messages';


export default combineReducers({
  data,
  titleEditModeOn,
  tagsEditModeOn,
  textContentEditModeOn,
  tagsErrorMessages,
});
