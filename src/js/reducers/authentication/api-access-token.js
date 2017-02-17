import { handleActions } from 'redux-actions';
import Cookies from 'js-cookie';

import {
  SIGNIN_REQUEST_SUCCESS, RECEIVE_TOKEN_FROM_COOKIE, LOG_OUT
} from 'utils/constants';
import { LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';


export default handleActions({
  [SIGNIN_REQUEST_SUCCESS]: (state, action) => {
    Cookies.set('apiAccessToken', action.payload.apiAccessToken, { expires: 30 });
    return action.payload.apiAccessToken;
  },
  [RECEIVE_TOKEN_FROM_COOKIE]: (state, action) => {
    return Cookies.get('apiAccessToken') || null;
  },
  [LANDING_PAGE_REQUEST_FAILURE]: (state, action) => {
    if (action.statusCode === 401) {
      Cookies.remove('apiAccessToken');
      return null;
    }
    return state;
  },
  [LOG_OUT]: (state, action) => {
    Cookies.remove('apiAccessToken');
    return null;
  }
}, null);
