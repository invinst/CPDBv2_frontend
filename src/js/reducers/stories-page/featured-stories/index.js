import { combineReducers } from 'redux';

import stories from './stories';
import isRequesting from './is-requesting';


export default combineReducers({
  stories,
  isRequesting
});
