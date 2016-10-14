import { handleActions } from 'redux-actions';

import {
  SIGNIN_REQUEST_FAILURE, SIGNIN_REQUEST_SUCCESS, CLOSE_SIGNIN_MODAL, SIGNIN_REQUEST
} from 'actions/authentication';


export default handleActions({
  [SIGNIN_REQUEST]: (state, action) => null,
  [SIGNIN_REQUEST_FAILURE]: (state, action) => action.payload.message,
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => null,
  [CLOSE_SIGNIN_MODAL]: (state, action) => null
}, null);
