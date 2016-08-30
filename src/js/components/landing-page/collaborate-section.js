import React from 'react';

import {
  paragraphStyle, underlinedLinkStyle, contentStyle, paragraphWrapperStyle, wrapperStyle, headerStyle
} from './collaborate-section.style';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import MoreLink from 'components/common/more-link';


class CollaborateSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        wrapper: paragraphWrapperStyle.extraWide,
        paragraph: [paragraphStyle.base, paragraphStyle.extraWide],
        underlineLink: [paragraphStyle.base, paragraphStyle.extraWide, underlinedLinkStyle]
      },
      [DESKTOP]: {
        wrapper: paragraphWrapperStyle.desktop,
        paragraph: [paragraphStyle.base],
        underlineLink: [paragraphStyle.base, underlinedLinkStyle]
      },
      [TABLET]: {
        wrapper: paragraphWrapperStyle.tablet,
        paragraph: [paragraphStyle.base, paragraphStyle.tablet],
        underlineLink: [paragraphStyle.base, paragraphStyle.tablet, underlinedLinkStyle]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          Collaborate with us
        </div>
        <div style={ contentStyle }>
          <div style={ style.wrapper }>
            <p style={ style.paragraph }>
              We are collecting and publishing information that sheds light on police misconduct.
            </p>
            <p style={ style.paragraph }>
              If you have documents or datasets you would like to publish,
              please <MoreLink style={ style.underlineLink } href='mailto:records@invisibleinstitute.com'>
              email us</MoreLink>, or <MoreLink to='#' style={ style.underlineLink }>learn more</MoreLink>.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfiguredRadium(CollaborateSection);
