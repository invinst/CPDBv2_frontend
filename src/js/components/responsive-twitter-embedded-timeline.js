import React from 'react';

import TwitterEmbeddedTimeline from 'components/twitter-embedded-timeline';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';


export default class ResponsiveTwitterEmbeddedTimeline extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        height: 950
      },
      [DESKTOP]: {
        height: 1005
      },
      [EXTRA_WIDE]: {
        height: 1212
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <TwitterEmbeddedTimeline height={ style.height }/>
    );
  }
}
