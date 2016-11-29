import React, { Component, PropTypes } from 'react';

import LoginModalButton from './login-modal-button';
import ForgotPasswordModal from './forgot-password-modal';
import ForgotPasswordLink from './forgot-password-link';
import {
  outerWrapperStyle, innerWrapperStyle, usernameInputStyle, passwordInputStyle,
  signInButtonStyle, labelStyle, nameWrapperStyle,
  passwordInputWrapperStyle, errorMessageStyle, successMessageStyle
} from './login-modal.style';
import FadeMotion from 'components/animation/fade-motion';


class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handlePasswordKeyDown = this.handlePasswordKeyDown.bind(this);
    this.handleForgotPassword = this.handleForgotPassword.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.focusNameInput = this.focusNameInput.bind(this);
    this.focusPasswordInput = this.focusPasswordInput.bind(this);
  }

  focusNameInput() {
    this.nameInput.focus();
  }

  focusPasswordInput() {
    this.passwordInput.focus();
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

  handleInputChange() {
    if (!!(this.nameInput.value && this.passwordInput.value) === this.state.disabled) {
      this.setState({
        disabled: !(this.nameInput.value && this.passwordInput.value)
      });
    }
  }

  renderContent(opacity) {
    const {
      loginErrorMessage, onResetPassword, forgotPasswordErrorMessage,
      loginSuccessMessage, showForgotPasswordModal
    } = this.props;
    const { disabled } = this.state;

    return (
      <div style={ { ...outerWrapperStyle, opacity } }>
        <div style={ innerWrapperStyle }>
          <div className='name-input-wrapper' style={ nameWrapperStyle } onClick={ this.focusNameInput }>
            <span style={ labelStyle }>Name</span>
            <input
              ref={ el => this.nameInput = el }
              onChange={ this.handleInputChange }
              style={ usernameInputStyle } />
          </div>
          <div
            className='password-input-wrapper' style={ passwordInputWrapperStyle } onClick={ this.focusPasswordInput }>
            <span style={ labelStyle }>Password</span>
            <input
              onKeyDown={ !disabled ? this.handlePasswordKeyDown : null }
              ref={ el => this.passwordInput = el }
              onChange={ this.handleInputChange }
              style={ passwordInputStyle }
              type='password'/>
            <ForgotPasswordLink onClick={ this.handleForgotPassword }/>
          </div>
          <div>
            <span style={ errorMessageStyle }>{ loginErrorMessage }</span>
            <span style={ successMessageStyle }>{ loginSuccessMessage }</span>
            <LoginModalButton
              style={ signInButtonStyle }
              onClick={ this.handleSignIn }
              disabled={ disabled }>
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
      <FadeMotion show={ this.props.showLoginModal }>
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
  forgotPasswordErrorMessage: PropTypes.string
};

export default LoginModal;
