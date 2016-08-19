import React, { PropTypes } from 'react';

import { paragraphStyle, underlinedLinkStyle, contentStyle } from './collaborate-section.style';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE } from 'utils/constants';
import MoreLink from 'components/common/more-link';


class CollaborateSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        paragraph: [paragraphStyle.base, paragraphStyle.extraWide],
        underlineLink: [paragraphStyle.base, paragraphStyle.extraWide, underlinedLinkStyle]
      },
      [DESKTOP]: {
        paragraph: [paragraphStyle.base],
        underlineLink: [paragraphStyle.base, underlinedLinkStyle]
      },
      [TABLET]: {
        paragraph: [paragraphStyle.base, paragraphStyle.tablet],
        underlineLink: [paragraphStyle.base, paragraphStyle.tablet, underlinedLinkStyle]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
        <div style={ template.header }>
          Collaborate with us
        </div>
        <div style={ [template.content, contentStyle] }>
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

CollaborateSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

CollaborateSection.defaultProps = {
  template: SectionTemplate(BASE_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(CollaborateSection);
