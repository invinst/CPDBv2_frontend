import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import summary from './summary';


export default combineReducers({
  isRequesting,
  summary
});
