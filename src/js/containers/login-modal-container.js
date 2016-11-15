import { connect } from 'react-redux';
import {
  signIn, resetPassword, openForgotPasswordModal
} from 'actions/authentication';
import { withRouter } from 'react-router';

import LoginModal from 'components/login-modal';
import showLoginModalSelector from 'selectors/login-modal/show-login-modal';


const mapDispatchToProps = {
  onSignIn: signIn,
  onResetPassword: resetPassword,
  onForgotPassword: openForgotPasswordModal
};

function mapStateToProps(state, ownProps) {
  const {
    loginErrorMessage, apiAccessToken, forgotPasswordErrorMessage,
    loginSuccessMessage, showForgotPasswordModal
  } = state.authentication;

  return {
    showLoginModal: showLoginModalSelector(state, ownProps),
    loginErrorMessage,
    apiAccessToken,
    forgotPasswordErrorMessage,
    loginSuccessMessage,
    showForgotPasswordModal
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginModal));
