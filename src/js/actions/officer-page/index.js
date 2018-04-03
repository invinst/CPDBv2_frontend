import { get } from 'actions/common/async-action';
import { createAction } from 'redux-actions';

import {
  OFFICER_URL,
  OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE,
  CHANGE_OFFICER_ID
} from 'utils/constants';


export const fetchOfficerSummary = officerId => (get(
  `${OFFICER_URL}${officerId}/summary/`,
  [OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE]
)());

export const changeOfficerId = createAction(CHANGE_OFFICER_ID);
