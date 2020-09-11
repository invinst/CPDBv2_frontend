import { get } from 'actions/common/async-action';
import {
  TOP_LAWSUITS_URL,
  TOP_LAWSUITS_REQUEST_START,
  TOP_LAWSUITS_REQUEST_SUCCESS,
  TOP_LAWSUITS_REQUEST_FAILURE,
  TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
  TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
  CAROUSEL_TYPES,
} from 'utils/constants';
import { createAction } from 'redux-actions';

export const getTopLawsuits = get(
  TOP_LAWSUITS_URL,
  [
    TOP_LAWSUITS_REQUEST_START,
    TOP_LAWSUITS_REQUEST_SUCCESS,
    TOP_LAWSUITS_REQUEST_FAILURE,
  ]
);

export const turnOnCarouselLawsuitHeaderEditMode = createAction(
  TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
  () => CAROUSEL_TYPES.LAWSUIT
);

export const turnOffCarouselLawsuitHeaderEditMode = createAction(
  TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
  () => CAROUSEL_TYPES.LAWSUIT
);
