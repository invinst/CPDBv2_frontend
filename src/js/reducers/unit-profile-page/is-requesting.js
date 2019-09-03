import { handleActions } from 'redux-actions';

import {
  UNIT_PROFILE_SUMMARY_REQUEST_START, UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS, UNIT_PROFILE_SUMMARY_REQUEST_FAILURE,
} from 'utils/constants';


const isRequesting = handleActions({
  [UNIT_PROFILE_SUMMARY_REQUEST_START]: (state, action) => true,
  [UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS]: (state, action) => false,
  [UNIT_PROFILE_SUMMARY_REQUEST_FAILURE]: (state, action) => false,
}, false);

export default isRequesting;
