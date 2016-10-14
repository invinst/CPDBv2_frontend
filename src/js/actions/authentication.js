import { createAction } from 'redux-actions';

import { post } from 'actions/common/async-action';
import { V2_ROOT_PATH_LOCAL } from 'utils/axios-client';


export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_REQUEST_SUCCESS = 'SIGNIN_REQUEST_SUCCESS';
export const SIGNIN_REQUEST_FAILURE = 'SIGNIN_REQUEST_FAILURE';

export const SIGNIN_URL = `${V2_ROOT_PATH_LOCAL}users/sign-in/`;

export const signIn = post(SIGNIN_URL, [
  SIGNIN_REQUEST, SIGNIN_REQUEST_SUCCESS, SIGNIN_REQUEST_FAILURE
]);

export const OPEN_SIGNIN_MODAL = 'OPEN_SIGNIN_MODAL';
export const CLOSE_SIGNIN_MODAL = 'CLOSE_SIGNIN_MODAL';

export const showLoginModal = createAction(OPEN_SIGNIN_MODAL);
export const hideLoginModal = createAction(CLOSE_SIGNIN_MODAL);
