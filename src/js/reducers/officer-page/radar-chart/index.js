import { combineReducers } from 'redux';

import items from './items';
import isRequesting from './is-requesting';

export default combineReducers({
  items,
  isRequesting
});

