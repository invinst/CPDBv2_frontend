import { combineReducers } from 'redux';

import cards from './cards';
import { headerEditModeOn } from 'reducers/landing-page/carousel-header-edit-utils';
import { CAROUSEL_TYPES } from 'utils/constants';


export default combineReducers({
  cards,
  headerEditModeOn: headerEditModeOn(CAROUSEL_TYPES.LAWSUIT),
});
