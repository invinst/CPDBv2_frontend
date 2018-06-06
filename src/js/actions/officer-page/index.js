import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';

import {
  CHANGE_OFFICER_ID,
  OFFICER_SUMMARY_REQUEST_FAILURE,
  OFFICER_SUMMARY_REQUEST_START,
  OFFICER_SUMMARY_REQUEST_SUCCESS,
  OFFICER_URL,
  CHANGE_OFFICER_TAB,
} from 'utils/constants';


export const fetchOfficerSummary = officerId => (get(
  `${OFFICER_URL}${officerId}/summary/`,
  [OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE]
)());

export const changeOfficerId = createAction(CHANGE_OFFICER_ID);

export const changeOfficerTab = createAction(CHANGE_OFFICER_TAB);
