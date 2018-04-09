import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import items from './items';


export default combineReducers({
  isRequesting,
  items
});
