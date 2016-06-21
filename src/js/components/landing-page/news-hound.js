import React from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { extraWideStyle, desktopStyle, tabletStyle, backgroundColorStyle } from './news-hound.style';
import ResponsiveStyleComponent, {
  EXTRA_WIDE, DESKTOP, TABLET
} from 'components/responsive/responsive-style-component';


class NewsHound extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        wrapper: [backgroundColorStyle, extraWideStyle]
      },
      [DESKTOP]: {
        wrapper: [backgroundColorStyle, desktopStyle]
      },
      [TABLET]: {
        wrapper: [backgroundColorStyle, tabletStyle]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div>
        <div style={ style.wrapper }/>
      </div>
    );
  }
}

export default ConfiguredRadium(NewsHound);
