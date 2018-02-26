import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { createAction } from 'redux-actions';


export const requestActivityGrid = get(
  constants.ACTIVITY_GRID_API_URL,
  [
    constants.ACTIVITY_GRID_REQUEST_START,
    constants.ACTIVITY_GRID_REQUEST_SUCCESS,
    constants.ACTIVITY_GRID_REQUEST_FAILURE
  ]
);

export const turnOnCarouselActivityHeaderEditMode = createAction(
  constants.TURN_ON_CAROUSEL_ACTIVITY_HEADER_EDIT_MODE);

export const turnOffCarouselActivityHeaderEditMode = createAction(
  constants.TURN_OFF_CAROUSEL_ACTIVITY_HEADER_EDIT_MODE
);
