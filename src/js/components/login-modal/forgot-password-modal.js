import PropTypes from 'prop-types';
import React, { Component } from 'react';

import LoginModalButton from './login-modal-button';
import {
  innerWrapperStyle, headerStyle, subHeaderStyle,
  emailInputWrapperStyle, labelStyle, emailInputStyle,
  errorMessageStyle,
} from './forgot-password-modal.style';
import FadeMotion from 'components/animation/fade-motion';

class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      prevShow: props.show,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { show } = props;
    if (!show && state.prevShow)
      return { disabled: true, prevShow: show };
    return { prevShow: show };
  }

  focusEmailInput = () => {
    this.emailInput.focus();
  };

  handleResetPassword = () => {
    this.props.onResetPassword({ email: this.emailInput.value });
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.handleResetPassword();
    }
  };

  handleInputChange = () => {
    if (!!this.emailInput.value === this.state.disabled) {
      this.setState({
        disabled: !this.emailInput.value,
      });
    }
  };

  renderContent = () => {
    const { errorMessage } = this.props;
    const { disabled } = this.state;

    return (
      <div style={ { ...innerWrapperStyle } } className='test--forgot-password-modal'>
        <div style={ headerStyle }>Forgot your password?</div>
        <div style={ subHeaderStyle }>We’ll email you instructions on how to reset it.</div>
        <div className='email-input-wrapper' style={ emailInputWrapperStyle } onClick={ this.focusEmailInput }>
          <span style={ labelStyle }>Email</span>
          <input
            ref={ (el) => this.emailInput = el }
            onKeyDown={ !disabled ? this.handleKeyDown : null }
            onChange={ this.handleInputChange }
            style={ emailInputStyle } type='email'/>
        </div>
        <div>
          <span style={ errorMessageStyle }>{ errorMessage }</span>
          <LoginModalButton
            onClick={ this.handleResetPassword }
            disabled={ disabled }
            className='test--reset-password'>
            Reset Password
          </LoginModalButton>
        </div>
      </div>
    );
  };

  render() {
    const { show } = this.props;
    return (
      <FadeMotion show={ show }>
        { this.renderContent }
      </FadeMotion>
    );
  }
}

ForgotPasswordModal.propTypes = {
  onResetPassword: PropTypes.func,
  errorMessage: PropTypes.string,
  show: PropTypes.bool,
};

export default ForgotPasswordModal;
