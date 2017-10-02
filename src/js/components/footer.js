import React from 'react';

import FooterNavLink from 'components/common/footer-nav-link';
import {
  wrapperStyle, linkStyle, linkWrapperStyle, sectionStyle, responsiveFixedWidthInnerStyle, firstLinkStyle
} from './footer.style';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import NoRerender from 'components/common/higher-order/no-rerender';


class Footer extends React.Component {
  render() {
    const links = ['Complaints Process', 'Glossary', 'Legal Disclaimer', 'Get Updates'];
    return (
      <div style={ sectionStyle }>
        <div style={ wrapperStyle }>
          <div style={ linkWrapperStyle }>
            <ResponsiveFluidWidthComponent style={ responsiveFixedWidthInnerStyle }>
              { links.map( (link, ind) => (
                <FooterNavLink style={ ind === 0 ? firstLinkStyle : linkStyle } key={ ind }>
                  { link }
                </FooterNavLink>
              )) }
            </ResponsiveFluidWidthComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default NoRerender(Footer);
