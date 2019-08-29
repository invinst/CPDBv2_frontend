import { handleActions } from 'redux-actions';

import {
  OFFICER_SUMMARY_REQUEST_START, OFFICER_SUMMARY_REQUEST_SUCCESS, OFFICER_SUMMARY_REQUEST_FAILURE, CHANGE_OFFICER_ID,
} from 'utils/constants';


const isRequesting = handleActions({
  [CHANGE_OFFICER_ID]: (state, action) => (true),
  [OFFICER_SUMMARY_REQUEST_START]: (state, action) => (true),
  [OFFICER_SUMMARY_REQUEST_SUCCESS]: (state, action) => (false),
  [OFFICER_SUMMARY_REQUEST_FAILURE]: (state, action) => (false),
}, false);

export default isRequesting;
