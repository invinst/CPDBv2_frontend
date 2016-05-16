import React from 'react';

import ResponsiveComponent from 'components/responsive/responsive-component';


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

  extractStyle(key) {
    let styleMap = this.responsiveStyle();
    let style = styleMap[key];
    if (typeof style === 'string') {
      style = styleMap[style];
    }
    return style;
  }

  renderDesktop() {
    return this.renderWithResponsiveStyle(this.extractStyle(DESKTOP));
  }

  renderTablet() {
    return this.renderWithResponsiveStyle(this.extractStyle(TABLET));
  }

  renderMobile() {
    return this.renderWithResponsiveStyle(this.extractStyle(MOBILE));
  }
}
