import React, { Component, PropTypes } from 'react';

import LoginModalButton from './login-modal-button';
import {
  innerWrapperStyle, headerStyle, subHeaderStyle,
  emailInputWrapperStyle, labelStyle, emailInputStyle,
  errorMessageStyle
} from './forgot-password-modal.style';

class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.handleResetPassword = this.handleResetPassword.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleResetPassword() {
    this.props.onResetPassword({ email: this.emailInput.value });
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      this.handleResetPassword();
    }
  }

  render() {
    const { errorMessage } = this.props;

    return (
      <div style={ innerWrapperStyle }>
        <div style={ headerStyle }>Forgot your password?</div>
        <div style={ subHeaderStyle }>We’ll email you instructions on how to reset it.</div>
        <div style={ emailInputWrapperStyle }>
          <span style={ labelStyle }>Email</span>
          <input
            ref={ (el) => this.emailInput = el }
            onKeyDown={ this.handleKeyDown }
            style={ emailInputStyle } type='email'/>
        </div>
        <div>
          <span style={ errorMessageStyle }>{ errorMessage }</span>
          <LoginModalButton onClick={ this.handleResetPassword }>
            Reset Password
          </LoginModalButton>
        </div>
      </div>
    );
  }
}

ForgotPasswordModal.propTypes = {
  onResetPassword: PropTypes.func,
  errorMessage: PropTypes.string
};

export default ForgotPasswordModal;
