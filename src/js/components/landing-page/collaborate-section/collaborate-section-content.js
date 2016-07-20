import React from 'react';

import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import {
  paragraphStyle, underlinedLinkStyle, wrapperStyle
} from './collaborate-section-content.style';


class CollaborateSectionContent extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [DESKTOP]: {
        paragraph: [paragraphStyle.base],
        underlineLink: [paragraphStyle.base, underlinedLinkStyle],
        wrapper: wrapperStyle.base
      },
      [TABLET]: {
        paragraph: [paragraphStyle.base, paragraphStyle.tablet],
        underlineLink: [paragraphStyle.base, paragraphStyle.tablet, underlinedLinkStyle],
        wrapper: [wrapperStyle.base, wrapperStyle.tablet]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ style.wrapper }>
        <p style={ style.paragraph }>
          We are collecting and publishing information that sheds light on police misconduct.
        </p>
        <p style={ style.paragraph }>
          If you have documents or datasets you would like to publish,
          please <a style={ style.underlineLink } href='mailto:records@invisibleinstitute.com'>
          email us</a>, or <a href='#' style={ style.underlineLink }>here</a>.
        </p>
      </div>
    );
  }
}

export default ConfiguredRadium(CollaborateSectionContent);

