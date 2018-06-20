import React, { PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import NoRerender from 'components/common/higher-order/no-rerender';
import { showIntercomMessages } from 'utils/intercom';
import FooterNavLink from './footer-nav-link';
import InvistLogo from './invist-logo';
import {
  wrapperStyle,
  sectionStyle,
  responsiveFixedWidthInnerStyle,
  invistWrapperStyle
} from './footer.style';

class Footer extends React.Component {
  render() {
    const { openLegalDisclaimerModal, style } = this.props;
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
      <div style={ { ...sectionStyle, ...style.wrapper } }>
        <div style={ wrapperStyle }>
          <div style={ responsiveFixedWidthInnerStyle }>
            <ResponsiveFluidWidthComponent>
              { links.map((link, ind) => (
                <FooterNavLink
                  style={ style.link }
                  key={ ind }
                  { ...link }
                />
              )) }
            </ResponsiveFluidWidthComponent>
          </div>
          <div style={ invistWrapperStyle }>
            <ResponsiveFluidWidthComponent>
              <InvistLogo />
            </ResponsiveFluidWidthComponent>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  openLegalDisclaimerModal: PropTypes.func,
  style: PropTypes.object,
};

Footer.defaultProps = {
  style: {}
};

export default NoRerender(Footer);
