import { combineReducers } from 'redux';

import cards from './cards';
import count from './count';

export default combineReducers({
  count,
  cards
});
