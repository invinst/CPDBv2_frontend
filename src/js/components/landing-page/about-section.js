import React from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import {
  paragraphStyle, contentWrapperStyle, wrapperStyle, headerStyle, contentStyle
} from './about-section.style';


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
    return (
      <div style={ wrapperStyle }>
        <div style={ headerStyle }>
          <div>About</div>
        </div>
        <div style={ contentStyle }>
          <div style={ contentWrapperStyle }>
            <p style={ style.paragraph }>
              The Citizens Police Data Project houses police disciplinary
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

export default ConfiguredRadium(AboutSection);
