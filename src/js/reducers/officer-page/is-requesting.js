import { handleActions } from 'redux-actions';

import {
  OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE
} from 'utils/constants';


const isRequesting = handleActions({
  [OFFICER_SUMMARY_REQUEST_START]: (state, action) => (true),
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => (false),
  [OFFICER_SUMMARY_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
