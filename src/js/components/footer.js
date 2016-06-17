import React from 'react';

import FooterNavLInk from 'components/common/footer-nav-link';
import {
  wrapperStyle, linkStyle, linkWrapperStyle, sectionStyle, responsiveFixedWidthInnerStyle
} from './footer.style';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


export default class Footer extends React.Component {
  render() {
    const links = ['Complaints Process', 'Glossary', 'Legal Disclaimer', 'Get Updates', 'Collaborate'];
    return (
      <div style={ sectionStyle }>
        <div style={ wrapperStyle }>
          <div style={ linkWrapperStyle }>
            <ResponsiveFixedWidthComponent style={ responsiveFixedWidthInnerStyle }>
              { links.map( (link, ind) => (
                <FooterNavLInk style={ linkStyle } key={ ind }>{ link }</FooterNavLInk>
              )) }
            </ResponsiveFixedWidthComponent>
          </div>
        </div>
      </div>
    );
  }
}
