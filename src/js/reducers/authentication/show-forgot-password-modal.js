import { handleActions } from 'redux-actions';

import {
  OPEN_SIGNIN_MODAL, OPEN_FORGOT_PASSWORD_MODAL, CLOSE_FORGOT_PASSWORD_MODAL,
  RESET_PASSWORD_SUCCESS
} from 'actions/authentication';


export default handleActions({
  [OPEN_FORGOT_PASSWORD_MODAL]: (state, action) => true,
  [CLOSE_FORGOT_PASSWORD_MODAL]: (state, action) => false,
  [OPEN_SIGNIN_MODAL]: (state, action) => false,
  [RESET_PASSWORD_SUCCESS]: (state, action) => false
}, false);
