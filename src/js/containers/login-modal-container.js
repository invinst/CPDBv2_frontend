import { connect } from 'react-redux';
import { signIn } from 'actions/authentication';

import LoginModal from 'components/login-modal';

const mapDispatchToProps = {
  onSignIn: signIn
};

function mapStateToProps(state, ownProps) {
  const { showLoginModal, errorMessage, apiAccessToken } = state.authentication;

  return {
    showLoginModal,
    errorMessage,
    apiAccessToken
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
