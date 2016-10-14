import { connect } from 'react-redux';
import { signIn, resetPassword, openForgotPasswordModal } from 'actions/authentication';

import LoginModal from 'components/login-modal';

const mapDispatchToProps = {
  onSignIn: signIn,
  onResetPassword: resetPassword,
  onForgotPassword: openForgotPasswordModal
};

function mapStateToProps(state, ownProps) {
  const {
    showLoginModal, loginErrorMessage, apiAccessToken, forgotPasswordErrorMessage,
    loginSuccessMessage, showForgotPasswordModal
  } = state.authentication;

  return {
    showLoginModal,
    loginErrorMessage,
    apiAccessToken,
    forgotPasswordErrorMessage,
    loginSuccessMessage,
    showForgotPasswordModal
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
