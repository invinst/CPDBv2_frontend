import React, { Component, PropTypes } from 'react';

import LoginModalButton from './login-modal-button';
import ForgotPasswordModal from './forgot-password-modal';
import HoverableButton from 'components/common/hoverable-button';
import {
  outerWrapperStyle, innerWrapperStyle, usernameInputStyle, passwordInputStyle,
  forgotPasswordLinkStyle, signInButtonStyle, labelStyle, nameWrapperStyle,
  passwordInputWrapperStyle, errorMessageStyle, successMessageStyle
} from './login-modal.style';
import FadeMotion from 'components/animation/fade-motion';


class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForgotModal: false
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handlePasswordKeyDown = this.handlePasswordKeyDown.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  handleSignIn() {
    this.props.onSignIn({
      username: this.nameInput.value,
      password: this.passwordInput.value
    });
  }

  handlePasswordKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleSignIn();
    }
  }

  handleForgotPassword() {
    this.props.onForgotPassword();
  }

  showLoginModal() {
    return this.props.showLoginModal
      || (this.context.editModeOn && !this.props.apiAccessToken);
  }

  renderContent(opacity) {
    const {
      loginErrorMessage, onResetPassword, forgotPasswordErrorMessage,
      loginSuccessMessage, showForgotPasswordModal
    } = this.props;

    return (
      <div style={ { ...outerWrapperStyle, opacity } }>
        <div style={ innerWrapperStyle }>
          <div style={ nameWrapperStyle }>
            <span style={ labelStyle }>Name</span>
            <input
              ref={ el => this.nameInput = el }
              style={ usernameInputStyle } />
          </div>
          <div style={ passwordInputWrapperStyle }>
            <span style={ labelStyle }>Password</span>
            <input
              onKeyDown={ this.handlePasswordKeyDown }
              ref={ el => this.passwordInput = el }
              style={ passwordInputStyle }
              type='password'/>
            <HoverableButton
              style={ forgotPasswordLinkStyle }
              onClick={ this.handleForgotPassword }>
              Forgot Password?
            </HoverableButton>
            <a style={ forgotPasswordLinkStyle }></a>
          </div>
          <div>
            <span style={ errorMessageStyle }>{ loginErrorMessage }</span>
            <span style={ successMessageStyle }>{ loginSuccessMessage }</span>
            <LoginModalButton
              style={ signInButtonStyle }
              onClick={ this.handleSignIn }>
              Sign In
            </LoginModalButton>
          </div>
        </div>
        <ForgotPasswordModal
          show={ showForgotPasswordModal }
          errorMessage={ forgotPasswordErrorMessage }
          onResetPassword={ onResetPassword }/>
      </div>
    );
  }

  render() {
    return (
      <FadeMotion show={ this.showLoginModal() }>
        { this.renderContent }
      </FadeMotion>
    );
  }
}

LoginModal.propTypes = {
  onSignIn: PropTypes.func,
  onResetPassword: PropTypes.func,
  onForgotPassword: PropTypes.func,
  showLoginModal: PropTypes.bool,
  showForgotPasswordModal: PropTypes.bool,
  loginErrorMessage: PropTypes.string,
  loginSuccessMessage: PropTypes.string,
  forgotPasswordErrorMessage: PropTypes.string,
  apiAccessToken: PropTypes.string
};

LoginModal.contextTypes = {
  editModeOn: PropTypes.bool
};

export default LoginModal;
