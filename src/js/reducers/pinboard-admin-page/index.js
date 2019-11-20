import { combineReducers } from 'redux';

import allPinboards from './all-pinboards';
import isLoading from './is-loading';
import graphData from './graph-data';

export default combineReducers({
  allPinboards,
  isLoading,
  graphData,
});
