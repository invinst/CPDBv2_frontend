import { handleActions } from 'redux-actions';

import {
  REPORTS_REQUEST_START, REPORTS_REQUEST_SUCCESS, REPORTS_REQUEST_FAILURE
} from 'actions/reporting-page';


const isRequesting = handleActions({
  [REPORTS_REQUEST_START]: (state, action) => (true),
  [REPORTS_REQUEST_SUCCESS]: (state, action) => (false),
  [REPORTS_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
