import { handleActions } from 'redux-actions';

import {
  SIGNIN_REQUEST, SIGNIN_REQUEST_FAILURE, SIGNIN_REQUEST_SUCCESS, RESET_PASSWORD_SUCCESS,
} from 'utils/constants';


export default handleActions({
  [SIGNIN_REQUEST]: (state, action) => null,
  [SIGNIN_REQUEST_FAILURE]: (state, action) => action.payload.message,
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => null,
  [RESET_PASSWORD_SUCCESS]: (state, action) => null,
}, null);
