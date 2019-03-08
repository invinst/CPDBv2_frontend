import { combineReducers } from 'redux';

import crawlers from './crawlers';
import pagination from './pagination';
import id from './id';


export default combineReducers({
  crawlers,
  pagination,
  id
});
