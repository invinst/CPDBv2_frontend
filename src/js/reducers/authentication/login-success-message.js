import { handleActions } from 'redux-actions';

import {
  RESET_PASSWORD_SUCCESS, SIGNIN_REQUEST_SUCCESS, CLOSE_SIGNIN_MODAL, SIGNIN_REQUEST,
  SIGNIN_REQUEST_FAILURE
} from 'actions/authentication';


export default handleActions({
  [SIGNIN_REQUEST]: (state, action) => null,
  [RESET_PASSWORD_SUCCESS]: (state, action) => action.payload.message,
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => null,
  [CLOSE_SIGNIN_MODAL]: (state, action) => null,
  [SIGNIN_REQUEST_FAILURE]: (state, action) => null
}, null);