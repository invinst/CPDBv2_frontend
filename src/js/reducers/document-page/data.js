import { handleActions } from 'redux-actions';

import { DOCUMENT_REQUEST_SUCCESS, UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [DOCUMENT_REQUEST_SUCCESS]: (state, action) => (
    action.payload
  ),
  [UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
}, {});
