import React, { PropTypes } from 'react';
import cx from 'classnames';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import NoRerender from 'components/common/higher-order/no-rerender';
import { showIntercomMessages } from 'utils/intercom';
import FooterNavLink from './footer-nav-link';
import styles from './footer.sass';
import { INVISIBLE_INSTITUTE_URL } from '../../utils/constants';
import OutboundLink from 'components/common/outbound-link';

class Footer extends React.Component {
  render() {
    const { openLegalDisclaimerModal, className } = this.props;
    const links = [
      {
        name: 'Legal',
        onClick: openLegalDisclaimerModal
      },
      {
        name: 'GitHub',
        externalHref: 'https://github.com/invinst/'
      },
      {
        name: 'Roadmap',
        externalHref: 'http://roadmap.cpdp.co/'
      },
      {
        name: 'Contact',
        onClick: () => { showIntercomMessages(true); }
      }
    ];

    return (
      <div className={ cx(styles.footer, className) }>
        <div className='footer-wrapper'>
          <div className='responsive-fixed-width-inner'>
            <ResponsiveFluidWidthComponent>
              { links.map((link, ind) => (
                <FooterNavLink
                  className='footer-nav-link'
                  key={ ind }
                  { ...link }
                />
              )) }
            </ResponsiveFluidWidthComponent>
          </div>
          <div className='invist-wrapper'>
            <ResponsiveFluidWidthComponent>
              <OutboundLink
                className='invist-logo test--footer-invinst-logo'
                href={ INVISIBLE_INSTITUTE_URL }
              />
            </ResponsiveFluidWidthComponent>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  openLegalDisclaimerModal: PropTypes.func,
  className: PropTypes.string,
};

Footer.defaultProps = {
  style: {}
};

export default NoRerender(Footer);
