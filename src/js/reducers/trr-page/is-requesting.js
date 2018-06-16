import { handleActions } from 'redux-actions';

import { TRR_REQUEST_START, TRR_REQUEST_SUCCESS, TRR_REQUEST_FAILURE } from 'utils/constants';


const isRequesting = handleActions({
  [TRR_REQUEST_START]: (state, action) => (true),
  [TRR_REQUEST_SUCCESS]: (state, action) => (false),
  [TRR_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
