import React from 'react';

import ResponsiveComponent from 'components/responsive-component';


export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';
export const TABLET = 'tablet';

export default class ResponsiveStyleComponent extends ResponsiveComponent {
  renderWithResponsiveStyle(style) {
    return <div/>;
  }

  responsiveStyle() {
    return {
      [DESKTOP]: {},
      [TABLET]: {},
      [MOBILE]: {}
    };
  }

  renderMobile() {
    return this.renderWithResponsiveStyle(this.responsiveStyle()[MOBILE]);
  }

  renderTablet() {
    return this.renderWithResponsiveStyle(this.responsiveStyle()[TABLET]);
  }

  renderDesktop() {
    return this.renderWithResponsiveStyle(this.responsiveStyle()[DESKTOP]);
  }
}
