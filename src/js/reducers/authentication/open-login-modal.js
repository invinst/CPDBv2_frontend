import { handleActions } from 'redux-actions';

import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL, SIGNIN_REQUEST_SUCCESS } from 'utils/constants';


export default handleActions({
  [OPEN_LOGIN_MODAL]: (state, action) => true,
  [CLOSE_LOGIN_MODAL]: (state, action) => false,
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => false,
}, false);
