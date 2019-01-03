import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import trrId from './trr-id';
import data from './data';
import attachmentRequest from './attachment-request';
import editModeOn from './edit-mode-on';


export default combineReducers({
  isRequesting,
  trrId,
  data,
  attachmentRequest,
  editModeOn,
});
