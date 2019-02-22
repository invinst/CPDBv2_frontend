import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import data from './data';


export default combineReducers({
  isRequesting,
  data,
});
