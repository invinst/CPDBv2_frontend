import { handleActions } from 'redux-actions';

import {
  PERCENTILE_REQUEST_START,
  PERCENTILE_REQUEST_SUCCESS,
  PERCENTILE_REQUEST_FAILURE
} from 'utils/constants';


const isRequesting = handleActions({
  [PERCENTILE_REQUEST_START]: (state, action) => (true),
  [PERCENTILE_REQUEST_SUCCESS]: (state, action) => (false),
  [PERCENTILE_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
