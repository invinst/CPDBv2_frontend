import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { createAction } from 'redux-actions';


export const getComplaintSummaries = get(
  constants.RECENT_COMPLAINT_SUMMARIES_URL,
  [
    constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_START,
    constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
    constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE,
  ]
);

export const turnOnCarouselComplaintHeaderEditMode = createAction(
  constants.TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
  () => constants.CAROUSEL_TYPES.COMPLAINT
);

export const turnOffCarouselComplaintHeaderEditMode = createAction(
  constants.TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
  () => constants.CAROUSEL_TYPES.COMPLAINT
);

