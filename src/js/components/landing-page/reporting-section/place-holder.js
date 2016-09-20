import React from 'react';

import ResponsiveStyleComponent, {
  DESKTOP, EXTRA_WIDE, TABLET
} from 'components/responsive/responsive-style-component';
import { desktopStyle, extraWideStyle } from './place-holder.style';


export default class ReportingPlaceHolder extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: { wrapper: desktopStyle },
      [DESKTOP]: { wrapper: desktopStyle },
      [EXTRA_WIDE]: { wrapper: extraWideStyle }
    };
  }

  renderWithResponsiveStyle(style) {
    return <div style={ style.wrapper }/>;
  }
}
