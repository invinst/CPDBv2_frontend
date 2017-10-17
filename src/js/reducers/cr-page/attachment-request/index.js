import { combineReducers } from 'redux';

import request from './request';
import subscribedCRIDs from './subscribed-crids';

export default combineReducers({
  request,
  subscribedCRIDs
});
