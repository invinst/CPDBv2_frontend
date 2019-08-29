import { handleActions } from 'redux-actions';

import { CR_REQUEST_START, CR_REQUEST_SUCCESS, CR_REQUEST_FAILURE } from 'utils/constants';


const isRequesting = handleActions({
  [CR_REQUEST_START]: (state, action) => (true),
  [CR_REQUEST_SUCCESS]: (state, action) => (false),
  [CR_REQUEST_FAILURE]: (state, action) => (false),
}, false);

export default isRequesting;
