import { combineReducers } from 'redux';

import cards from './cards';
import isRequesting from './is-requesting';
import { headerEditModeOn } from '../carousel-header-edit-utils';
import { CAROUSEL_TYPES } from 'utils/constants';


export default combineReducers({
  cards,
  isRequesting,
  headerEditModeOn: headerEditModeOn(CAROUSEL_TYPES.ALLEGATION)
});
