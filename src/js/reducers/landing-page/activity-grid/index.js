import { combineReducers } from 'redux';

import cards from './cards';
import isRequesting from './is-requesting';
import headerEditModeOn from './header-edit-mode-on';


export default combineReducers({
  cards,
  isRequesting,
  headerEditModeOn
});
