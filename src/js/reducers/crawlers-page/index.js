import { combineReducers } from 'redux';

import crawlers from './crawlers';
import pagination from './pagination';
import currentCrawlerId from './current-crawler-id';


export default combineReducers({
  crawlers,
  pagination,
  currentCrawlerId,
});
