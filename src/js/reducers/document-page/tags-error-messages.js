import { handleActions } from 'redux-actions';

import {
  UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE,
  UPDATE_DOCUMENT_PAGE_REQUEST_START,
  UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
} from 'utils/constants';


export default handleActions({
  [UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE]: (state, action) => {
    return (action.payload.message || {})['tags'] || null;
  },
  [UPDATE_DOCUMENT_PAGE_REQUEST_START]: (state, action) => null,
  [UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS]: (state, action) => null,
}, null);
