import { combineReducers } from 'redux';

import reportGrouping from './report-grouping';
import pagination from './pagination';


export default combineReducers({
  reportGrouping,
  pagination
});
