import OutboundLink from 'components/common/outbound-link';
import React, { Component, PropTypes } from 'react';
import { QA_LINK } from 'utils/constants';
import style from './legal-disclaimer-modal-content.sass';
import { showIntercomMessages } from 'utils/intercom';


class LegalDisclaimerModalContent extends Component {
  render() {
    return (
      <div className={ style.legalDisclaimerModalContent }>
        <p className='legal-disclaimer-instruction'>LEGAL DISCLAIMER</p>
        <div className='legal-disclaimer-body'>
          <p>
            The information we provide comes primarily from data provided by the City of Chicago in response to
            litigation and Freedom Of Information Act (FOIA) requests. We have incorporated other publicly available
            data whenever possible.
          </p>
          <p>
            We cannot guarantee the accuracy of this data - instead we commit ourselves to being honest about
            flaws (<OutboundLink href={ QA_LINK } className='legal-disclaimer-body-link'>Q&A</OutboundLink>
            ), transparent in our publishing process (
            <OutboundLink
              href='https://github.com/invinst/'
              target='_blank'
              className='legal-disclaimer-body-link'
            >
              GitHub
            </OutboundLink>
            ), and welcoming of critiques (
            <a
              className='legal-disclaimer-body-link'
              onClick={ () => { showIntercomMessages(true); } }
            >
              contact
            </a>
            ).
          </p>
        </div>
        <a onClick={ this.props.closeModal } className='i-understand-link'>
          I understand
        </a>
      </div>
    );
  }
}

LegalDisclaimerModalContent.propTypes = {
  closeModal: PropTypes.func,
};

export default LegalDisclaimerModalContent;
