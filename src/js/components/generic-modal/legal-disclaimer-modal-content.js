import OutboundLink from 'components/common/outbound-link';
import React, { Component, PropTypes } from 'react';
import { QA_LINK } from 'utils/constants';
import {
  instructionStyle,
  paddingWrapperStyle,
  legalBodyStyle,
  linkStyle,
  iUnderstandStyle
} from './generic-modal.style';
import { showIntercomMessages } from 'utils/intercom';


class LegalDisclaimerModalContent extends Component {
  render() {
    return (
      <div style={ paddingWrapperStyle }>
        <p style={ instructionStyle }>LEGAL DISCLAIMER</p>
        <div style={ legalBodyStyle }>
          <p>
            The information we provide comes primarily from data provided by the City of Chicago in response to
            litigation and Freedom Of Information Act (FOIA) requests. We have incorporated other publicly available
            data whenever possible.
          </p>
          <p>
            We cannot guarantee the accuracy of this data - instead we commit ourselves to being honest about
            flaws (<OutboundLink href={ QA_LINK } style={ linkStyle }>Q&A</OutboundLink>
            ), transparent in our publishing process (
            <OutboundLink
              href='https://github.com/invinst/'
              target='_blank'
              style={ linkStyle }
              className='test--github-link'
            >
              GitHub
            </OutboundLink>
            ), and welcoming of critiques (
            <a
              className='test--contact-link'
              style={ linkStyle }
              onClick={ () => { showIntercomMessages(true); } }
            >
              contact
            </a>
            ).
          </p>
        </div>
        <a onClick={ this.props.closeModal } style={ iUnderstandStyle } className='test--i-understand-link'>
          I understand
        </a>
      </div>
    );
  }
}

LegalDisclaimerModalContent.propTypes = {
  closeModal: PropTypes.func
};

export default LegalDisclaimerModalContent;
