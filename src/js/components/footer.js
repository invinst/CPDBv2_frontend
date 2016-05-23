import React from 'react';

import FooterNavLInk from 'components/common/footer-nav-link';
import { wrapperStyle, linkStyle, linkWrapperStyle, sectionStyle } from './footer.style';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import CollaborateSection from 'components/collaborate-section';


export default class Footer extends React.Component {
  render() {
    const links = ['Complaints Process', 'Glossary', 'Legal Disclaimer', 'Get Updates', 'Collaborate'];
    return (
      <div style={ sectionStyle }>
        <CollaborateSection />
        <div style={ wrapperStyle }>
          <div style={ linkWrapperStyle }>
            <ResponsiveFixedWidthComponent>
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
