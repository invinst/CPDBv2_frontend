import { combineReducers } from 'redux';

import cards from './cards';
import isRequesting from './is-requesting';

export default combineReducers({
  cards,
  isRequesting,
});
