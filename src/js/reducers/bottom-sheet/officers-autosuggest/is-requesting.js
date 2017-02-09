import { handleActions } from 'redux-actions';

import {
  SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE
} from 'utils/constants';


const isRequesting = handleActions({
  [SEARCH_OFFICERS_REQUEST_START]: (state, action) => (true),
  [SEARCH_OFFICERS_REQUEST_SUCCESS]: (state, action) => (false),
  [SEARCH_OFFICERS_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
