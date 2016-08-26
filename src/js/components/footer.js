import React from 'react';

import FooterNavLink from 'components/common/footer-nav-link';
import {
  wrapperStyle, linkStyle, linkWrapperStyle, sectionStyle, responsiveFixedWidthInnerStyle, firstLinkStyle
} from './footer.style';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


export default class Footer extends React.Component {
  render() {
    const links = ['Complaints Process', 'Glossary', 'Legal Disclaimer', 'Get Updates'];
    return (
      <div style={ sectionStyle }>
        <div style={ wrapperStyle }>
          <div style={ linkWrapperStyle }>
            <ResponsiveFixedWidthComponent style={ responsiveFixedWidthInnerStyle }>
              { links.map( (link, ind) => (
                <FooterNavLink style={ ind === 0 ? firstLinkStyle : linkStyle } key={ ind }>
                { link }
                </FooterNavLink>
              )) }
            </ResponsiveFixedWidthComponent>
          </div>
        </div>
      </div>
    );
  }
}
