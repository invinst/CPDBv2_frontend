import React, { Component, PropTypes } from 'react';

import MoreLink from 'components/common/more-link';
import ResponsiveStyleComponent, {
  DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import StripeButton from './stripe-button';
import {
  wrapperStyle, titleStyle, rightColumnStyle, firstRowStyle, linkStyle, secondRowStyle,
  stripeButtonStyle
} from './code-of-silence-section.style';


export default class CodeOfSilenceSection extends Component {
  constructor(props) {
    super(props);
    this.renderWithResponsiveStyle = this.renderWithResponsiveStyle.bind(this);
  }

  renderWithResponsiveStyle(style) {
    const { sendStripeToken } = this.props;
    return (
      <div style={ style.wrapper }>
        <div style={ style.title }>Code of Silence</div>
        <div style={ style.rightColumn }>
          <div style={ style.firstRow }>
            Read the full story on
            <MoreLink style={ linkStyle } href='https://theintercept.com/series/code-of-silence/'>
              The Intercept
            </MoreLink>
          </div>
          <div style={ style.secondRow }>
            Purchase the print edition to read offline
            <StripeButton sendToken={ sendStripeToken } style={ style.stripeButton }/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {
          [EXTRA_WIDE]: {
            wrapper: wrapperStyle[EXTRA_WIDE],
            title: titleStyle[EXTRA_WIDE],
            rightColumn: rightColumnStyle[EXTRA_WIDE],
            firstRow: firstRowStyle[EXTRA_WIDE],
            secondRow: secondRowStyle[EXTRA_WIDE],
            stripeButton: stripeButtonStyle[EXTRA_WIDE]
          },
          [DESKTOP]: {
            wrapper: wrapperStyle[DESKTOP],
            title: titleStyle[DESKTOP],
            rightColumn: rightColumnStyle[DESKTOP],
            firstRow: firstRowStyle[DESKTOP],
            secondRow: secondRowStyle[DESKTOP],
            stripeButton: stripeButtonStyle[DESKTOP]
          }
        } }>
        { this.renderWithResponsiveStyle }
      </ResponsiveStyleComponent>
    );
  }
}

CodeOfSilenceSection.propTypes = {
  sendStripeToken: PropTypes.func
};
