import { combineReducers } from 'redux';

import showForgotPasswordModal from './show-forgot-password-modal';
import loginErrorMessage from './login-error-message';
import loginSuccessMessage from './login-success-message';
import forgotPasswordErrorMessage from './forgot-password-error-message';
import apiAccessToken from './api-access-token';


export default combineReducers({
  loginErrorMessage,
  loginSuccessMessage,
  forgotPasswordErrorMessage,
  apiAccessToken,
  showForgotPasswordModal
});
