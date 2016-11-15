import React, { Component, PropTypes } from 'react';

import UnderlineText from 'components/common/underline-text';
import Hoverable from 'components/common/higher-order/hoverable';
import { forgotPasswordLinkStyle } from './forgot-password-link.style';

class ForgotPasswordLink extends Component {
  render() {
    const { onClick, hovering } = this.props;

    return (
      <UnderlineText
        onClick={ onClick }
        hovering={ hovering }
        style={ forgotPasswordLinkStyle }>
        Forgot Password?
      </UnderlineText>
    );
  }
}

ForgotPasswordLink.propTypes = {
  onClick: PropTypes.func,
  hovering: PropTypes.bool
};

export default Hoverable(ForgotPasswordLink);
