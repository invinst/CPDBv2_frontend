import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';
import {
  SEARCH_OFFICER_URL, SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE
} from 'utils/constants';



export const OPEN_BOTTOM_SHEET_WITH_REPORT = 'OPEN_BOTTOM_SHEET_WITH_REPORT';
export const OPEN_BOTTOM_SHEET_WITH_FAQ = 'OPEN_BOTTOM_SHEET_WITH_FAQ';
export const CLOSE_BOTTOM_SHEET = 'CLOSE_BOTTOM_SHEET';
export const OPEN_BOTTOM_SHEET_TO_CREATE_FAQ = 'OPEN_BOTTOM_SHEET_TO_CREATE_FAQ';
export const OPEN_BOTTOM_SHEET_TO_CREATE_REPORT = 'OPEN_BOTTOM_SHEET_TO_CREATE_REPORT';

export const openBottomSheetWithReport = createAction(OPEN_BOTTOM_SHEET_WITH_REPORT);
export const openBottomSheetWithFAQ = createAction(OPEN_BOTTOM_SHEET_WITH_FAQ);
export const closeBottomSheet = createAction(CLOSE_BOTTOM_SHEET);
export const openBottomSheetToCreateFAQ = createAction(OPEN_BOTTOM_SHEET_TO_CREATE_FAQ);
export const openBottomSheetToCreateReport = createAction(OPEN_BOTTOM_SHEET_TO_CREATE_REPORT);

export const searchOfficers = (text) => (get(
  `${SEARCH_OFFICER_URL}${text}/`,
  [SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE]
)());
