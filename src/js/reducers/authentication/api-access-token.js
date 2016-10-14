import { handleActions } from 'redux-actions';
import Cookies from 'js-cookie';

import { SIGNIN_REQUEST_SUCCESS, RECEIVE_TOKEN_FROM_COOKIE } from 'actions/authentication';


export default handleActions({
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => {
    Cookies.set('apiAccessToken', action.payload.apiAccessToken, { expires: 30 });
    return action.payload.apiAccessToken;
  },
  [RECEIVE_TOKEN_FROM_COOKIE]: (state, action) => {
    return Cookies.get('apiAccessToken') || null;
  }
}, null);
