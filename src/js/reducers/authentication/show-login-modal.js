import { handleActions } from 'redux-actions';

import {
  OPEN_SIGNIN_MODAL, CLOSE_SIGNIN_MODAL, SIGNIN_REQUEST_SUCCESS
} from 'actions/authentication';
import { LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


export default handleActions({
  [OPEN_SIGNIN_MODAL]: (state, action) => true,
  [CLOSE_SIGNIN_MODAL]: (state, action) => false,
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => false,
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => {
    if (action.statusCode === 401) return true;
    return state;
  }
}, false);
