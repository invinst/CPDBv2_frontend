import { combineReducers } from 'redux';

import allPinboards from './all-pinboards';
import isLoading from './is-loading';

export default combineReducers({
  allPinboards,
  isLoading,
});
