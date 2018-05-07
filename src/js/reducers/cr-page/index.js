import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import attachmentRequest from './attachment-request';
import crid from './crid';
import officerId from './officer-id';
import relatedComplaints from './related-complaints';


export default combineReducers({
  isRequesting,
  crid,
  officerId,
  attachmentRequest,
  relatedComplaints
});
