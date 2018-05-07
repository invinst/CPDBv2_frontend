import { combineReducers } from 'redux';

import cards from './cards';
import count from './count';
import pagination from './pagination';

export default combineReducers({
  count,
  pagination,
  cards
});
