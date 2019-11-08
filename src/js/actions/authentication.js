import { createAction } from 'redux-actions';

import { post } from 'actions/common/async-action';
import {
  SIGNIN_URL, RESET_PASSWORD_URL, LOG_OUT, SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL, RECEIVE_TOKEN_FROM_COOKIE, OPEN_LOGIN_MODAL,
} from 'utils/constants';


export const signIn = post(SIGNIN_URL, [
  SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE,
]);


export const resetPassword = post(RESET_PASSWORD_URL, [
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE,
]);

export const openForgotPasswordModal = createAction(OPEN_FORGOT_PASSWORD_MODAL);
export const closeForgotPasswordModal = createAction(CLOSE_FORGOT_PASSWORD_MODAL);
export const openLoginModal = createAction(OPEN_LOGIN_MODAL);

export const receiveTokenFromCookie = createAction(RECEIVE_TOKEN_FROM_COOKIE);

export const logOut = createAction(LOG_OUT);
