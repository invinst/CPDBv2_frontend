import { handleActions } from 'redux-actions';

import {
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';


const isRequesting = handleActions({
  [LANDING_PAGE_REQUEST_START]: (state, action) => (true),
  [LANDING_PAGE_REQUEST_SUCCESS]: (state, action) => (false),
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
