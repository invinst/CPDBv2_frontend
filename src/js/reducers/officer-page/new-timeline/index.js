import { combineReducers } from 'redux';

import isRequesting from './is-requesting';
import items from './items';
import filter from './filter';

export default combineReducers({
  isRequesting,
  items,
  filter,
});
