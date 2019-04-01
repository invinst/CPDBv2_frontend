import { combineReducers } from 'redux';

import coaccusals from './coaccusals';
import count from './count';
import pagination from './pagination';


export default combineReducers({
  coaccusals,
  count,
  pagination,
});
