import { handleActions } from 'redux-actions';

import {
  OFFICER_COACCUSALS_REQUEST_START,
  OFFICER_COACCUSALS_REQUEST_SUCCESS,
  OFFICER_COACCUSALS_REQUEST_FAILURE,
} from 'utils/constants';


const isRequesting = handleActions({
  [OFFICER_COACCUSALS_REQUEST_START]: (state, action) => (true),
  [OFFICER_COACCUSALS_REQUEST_SUCCESS]: (state, action) => (false),
  [OFFICER_COACCUSALS_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
