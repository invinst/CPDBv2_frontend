import { combineReducers } from 'redux';

import request from './request';
import subscribedTRRIds from './subscribed-trr-ids';

export default combineReducers({
  request,
  subscribedTRRIds
});
