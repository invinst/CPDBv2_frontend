import { handleActions } from 'redux-actions';

import { CR_REQUEST_DOC_START, CR_REQUEST_DOC_SUCCESS, CR_REQUEST_DOC_FAILURE } from 'utils/constants';


const request = handleActions({
  [CR_REQUEST_DOC_START]: (state, action) => ( { isRequested: false } ),
  [CR_REQUEST_DOC_SUCCESS]: (state, action) => ({ isRequested: true, message: action.payload.message } ),
  [CR_REQUEST_DOC_FAILURE]: (state, action) => ({ isRequested: false, message: action.payload.message })
}, { isRequested: false, message: '' });

export default request;
