import * as constants from 'utils/constants';
import { editModeOn } from 'utils/edit-path';
import { handleActions } from 'redux-actions';

export const headerEditModeOn = (carouselType) => {
  return handleActions({
    [constants.TURN_ON_CAROUSEL_HEADER_EDIT_MODE]:
      (state, { payload }) => payload === carouselType || state,
    [constants.TURN_OFF_CAROUSEL_HEADER_EDIT_MODE]:
      (state, { payload }) => payload === carouselType ? false : state,
    [constants.LOCATION_CHANGE]: (state, action) => {
      if (state && !editModeOn(action.payload.pathname)) {
        return false;
      }
      return state;
    },
  }, false);
};
