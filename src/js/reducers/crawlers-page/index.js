import { combineReducers } from 'redux';

import crawlers from './crawlers';
import pagination from './pagination';


export default combineReducers({
  crawlers,
  pagination
});
