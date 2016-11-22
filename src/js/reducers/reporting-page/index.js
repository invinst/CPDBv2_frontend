import { combineReducers } from 'redux';

import reportGrouping from './report-grouping';
import pagination from './pagination';
import isRequesting from './is-requesting';


export default combineReducers({
  reportGrouping,
  pagination,
  isRequesting
});
