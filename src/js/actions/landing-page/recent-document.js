import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';
import { createAction } from 'redux-actions';


export const getRecentDocument = get(
  constants.RECENT_DOCUMENT_URL,
  [
    constants.RECENT_DOCUMENT_REQUEST_START,
    constants.RECENT_DOCUMENT_REQUEST_SUCCESS,
    constants.RECENT_DOCUMENT_REQUEST_FAILURE
  ]
);

export const turnOnCarouselDocumentHeaderEditMode = createAction(
  constants.TURN_ON_CAROUSEL_HEADER_EDIT_MODE,
  () => constants.CAROUSEL_TYPES.DOCUMENT
);

export const turnOffCarouselDocumentHeaderEditMode = createAction(
  constants.TURN_OFF_CAROUSEL_HEADER_EDIT_MODE,
  () => constants.CAROUSEL_TYPES.DOCUMENT
);
