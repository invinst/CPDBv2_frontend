import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { buttonStyle, buttonHoverStyle } from './stripe-button.style';


class StripeButton extends Component {
  constructor(props) {
    super(props);
    this.openStripeCheckout = this.openStripeCheckout.bind(this);
  }
  componentDidMount() {
    const { sendToken } = this.props;
    this.stripeHandler = global.StripeCheckout.configure({
      key: 'pk_test_LmyxXgvZbC0JAfieKyiR2WjU',
      name: 'Invisible Institute',
      description: 'Code of Silence print edition',
      amount: 500,
      token: ({ id }) => sendToken(id)
    });
  }

  openStripeCheckout() {
    this.stripeHandler.open();
  }

  render() {
    const { hovering, style } = this.props;
    return (
      <div
        className='link--transition'
        style={ { ...style, ...(hovering ? buttonHoverStyle : buttonStyle) } }
        onClick={ this.openStripeCheckout }>
        $5.00
      </div>
    );
  }
}

StripeButton.propTypes = {
  sendToken: PropTypes.func,
  hovering: PropTypes.bool,
  style: PropTypes.object
};

export default Hoverable(StripeButton);
