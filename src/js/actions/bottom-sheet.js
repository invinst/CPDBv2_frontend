import { createAction } from 'redux-actions';

import { get } from 'actions/common/async-action';
import {
  SEARCH_OFFICER_URL, SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE,
  OPEN_BOTTOM_SHEET_WITH_REPORT, OPEN_BOTTOM_SHEET_WITH_FAQ, OPEN_OFFICER_PAGE, CLOSE_BOTTOM_SHEET,
  OPEN_BOTTOM_SHEET_TO_CREATE_FAQ, OPEN_BOTTOM_SHEET_TO_CREATE_REPORT, OPEN_COMPLAINT_PAGE,
  OPEN_POLICE_UNIT_PAGE, OPEN_OFFICER_SOCIAL_GRAPH_PAGE
} from 'utils/constants';


export const openBottomSheetWithReport = createAction(OPEN_BOTTOM_SHEET_WITH_REPORT);
export const openBottomSheetWithFAQ = createAction(OPEN_BOTTOM_SHEET_WITH_FAQ);
export const closeBottomSheet = createAction(CLOSE_BOTTOM_SHEET);
export const openBottomSheetToCreateFAQ = createAction(OPEN_BOTTOM_SHEET_TO_CREATE_FAQ);
export const openBottomSheetToCreateReport = createAction(OPEN_BOTTOM_SHEET_TO_CREATE_REPORT);
export const openComplaintPage = createAction(OPEN_COMPLAINT_PAGE);
export const openPoliceUnitPage = createAction(OPEN_POLICE_UNIT_PAGE);
export const openOfficerPage = createAction(OPEN_OFFICER_PAGE);
export const openOfficerSocialGraphPage = createAction(OPEN_OFFICER_SOCIAL_GRAPH_PAGE);

export const searchOfficers = (text) => (get(
  `${SEARCH_OFFICER_URL}${text}/`,
  [SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE]
)());
