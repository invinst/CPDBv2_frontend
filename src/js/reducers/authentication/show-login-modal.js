import { handleActions } from 'redux-actions';

import {
  OPEN_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL, SIGNIN_REQUEST_SUCCESS
} from 'actions/authentication';


export default handleActions({
  [OPEN_SIGNIN_MODAL]: (state, action) => true,
  [CLOSE_SIGNIN_MODAL]: (state, action) => false,
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => false
}, false);
