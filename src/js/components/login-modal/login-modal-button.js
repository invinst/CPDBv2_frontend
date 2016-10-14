import React, { Component, PropTypes } from 'react';

import HoverableButton from 'components/common/hoverable-button';
import { buttonStyle } from './login-modal-button.style';


export default class LoginModalButton extends Component {
  render() {
    const { children, onClick } = this.props;

    return (
      <HoverableButton onClick={ onClick } style={ buttonStyle }>
        { children }
      </HoverableButton>
    );
  }
}

LoginModalButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};
