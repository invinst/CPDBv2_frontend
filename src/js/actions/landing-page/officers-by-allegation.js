import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { createAction } from 'redux-actions';


export const requestOfficersByAllegation = get(
  constants.OFFICERS_BY_ALLEGATION_API_URL,
  [
    constants.OFFICERS_BY_ALLEGATION_REQUEST_START,
    constants.OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS,
    constants.OFFICERS_BY_ALLEGATION_REQUEST_FAILURE,
  ]
);

export const turnOnCarouselAllegationHeaderEditMode = createAction(
  constants.TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
  () => constants.CAROUSEL_TYPES.ALLEGATION
);

export const turnOffCarouselAllegationHeaderEditMode = createAction(
  constants.TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
  () => constants.CAROUSEL_TYPES.ALLEGATION
);
