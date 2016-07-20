import React from 'react';

import ResponsiveStyleComponent, { DESKTOP, TABLET } from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import {
  boldTextStyle, paragraphStyle, wrapperStyle
} from './about-section-content.style';


class AboutSectionContent extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [DESKTOP]: {
        paragraph: [paragraphStyle.base]
      },
      [TABLET]: {
        paragraph: [paragraphStyle.base, paragraphStyle.tablet]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
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
    );
  }
}

export default ConfiguredRadium(AboutSectionContent);

