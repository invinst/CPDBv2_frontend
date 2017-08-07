import { get } from 'actions/common/async-action';

import {
  UNIT_PROFILE_URL,
  UNIT_PROFILE_SUMMARY_REQUEST_START, UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS, UNIT_PROFILE_SUMMARY_REQUEST_FAILURE
} from 'utils/constants';


export const fetchUnitProfileSummary = unitName => (get(
  `${UNIT_PROFILE_URL}${unitName}/summary/`,
  [UNIT_PROFILE_SUMMARY_REQUEST_START, UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS, UNIT_PROFILE_SUMMARY_REQUEST_FAILURE]
)());
