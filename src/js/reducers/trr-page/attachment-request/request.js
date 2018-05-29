import { handleActions } from 'redux-actions';

import { TRR_REQUEST_DOC_START, TRR_REQUEST_DOC_SUCCESS, TRR_REQUEST_DOC_FAILURE } from 'utils/constants';


const request = handleActions({
  [TRR_REQUEST_DOC_START]: (state, action) => ( { isRequested: false } ),
  [TRR_REQUEST_DOC_SUCCESS]: (state, action) => ({ isRequested: true, message: action.payload.message } ),
  [TRR_REQUEST_DOC_FAILURE]: (state, action) => ({ isRequested: false, message: action.payload.message })
}, { isRequested: false, message: '' });

export default request;
