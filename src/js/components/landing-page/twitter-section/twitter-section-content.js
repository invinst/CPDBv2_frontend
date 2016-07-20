import React from 'react';

import TwitterEmbeddedTimeline from './twitter-embedded-timeline';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';


export default class TwitterSectionContent extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: {
        height: 400
      },
      [DESKTOP]: {
        height: 500
      },
      [EXTRA_WIDE]: {
        height: 600
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <TwitterEmbeddedTimeline height={ style.height }/>
    );
  }
}
