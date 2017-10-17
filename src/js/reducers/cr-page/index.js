import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import attachmentRequest from './attachment-request';

export default combineReducers({
  isRequesting,
  attachmentRequest
});
