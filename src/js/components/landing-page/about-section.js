import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  boldTextStyle, paragraphStyle, contentWrapperStyle
} from './about-section.style';
import SectionTemplate from 'utils/template/section';
import { BASE_TEMPLATE } from 'utils/constants';


class AboutSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        paragraph: [paragraphStyle.base, paragraphStyle.extraWide]
      },
      [DESKTOP]: {
        paragraph: [paragraphStyle.base]
      },
      [TABLET]: {
        paragraph: [paragraphStyle.base, paragraphStyle.tablet]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { template, wrapperStyle } = this.props;

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
        <div style={ template.header }>
          <div>About</div>
        </div>
        <div style={ template.content }>
          <div style={ contentWrapperStyle }>
            <p style={ style.paragraph }>
              The <span style={ boldTextStyle }>Citizens Police Data Project</span> houses police disciplinary
              information obtained from the City of Chicago.
            </p>
            <p style={ style.paragraph }>
              The information and stories we have collected here are intended
              as a resource for public oversight. Our aim is to create a new
              model of accountability between officers and citizens.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

AboutSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

AboutSection.defaultProps = {
  template: SectionTemplate(BASE_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(AboutSection);
