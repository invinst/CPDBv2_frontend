import { combineReducers } from 'redux';

import showLoginModal from './show-login-modal';
import errorMessage from './error-message';
import apiAccessToken from './api-access-token';


export default combineReducers({
  showLoginModal,
  errorMessage,
  apiAccessToken
});
