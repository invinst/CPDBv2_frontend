import React, { Component } from 'react';

import ResponsiveStyleComponent, {
  DESKTOP, EXTRA_WIDE, TABLET
} from 'components/responsive/responsive-style-component';
import { desktopStyle, extraWideStyle } from './place-holder.style';


export default class ReportingPlaceHolder extends Component {
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

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}
