import { handleActions } from 'redux-actions';

import {
  DOCUMENT_OVERVIEW_REQUEST_START,
  DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
  DOCUMENT_OVERVIEW_REQUEST_FAILURE,
} from 'utils/constants';


const isRequesting = handleActions({
  [DOCUMENT_OVERVIEW_REQUEST_START]: (state, action) => true,
  [DOCUMENT_OVERVIEW_REQUEST_SUCCESS]: (state, action) => false,
  [DOCUMENT_OVERVIEW_REQUEST_FAILURE]: (state, action) => false,
}, false);

export default isRequesting;
