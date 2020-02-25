import { LOCATION_CHANGE } from 'connected-react-router';
import { handleActions } from 'redux-actions';

import { TURN_ON_CAROUSEL_HEADER_EDIT_MODE, TURN_OFF_CAROUSEL_HEADER_EDIT_MODE } from 'utils/constants';
import { editModeOn } from 'utils/edit-path';

export const headerEditModeOn = (carouselType) => {
  return handleActions({
    [TURN_ON_CAROUSEL_HEADER_EDIT_MODE]:
      (state, { payload }) => payload === carouselType || state,
    [TURN_OFF_CAROUSEL_HEADER_EDIT_MODE]:
      (state, { payload }) => payload === carouselType ? false : state,
    [LOCATION_CHANGE]: (state, action) => {
      if (state && !editModeOn(action.payload.location.pathname)) {
        return false;
      }
      return state;
    },
  }, false);
};
