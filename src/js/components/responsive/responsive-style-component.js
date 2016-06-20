import React from 'react';
import { assign } from 'lodash';

import ResponsiveComponent from 'components/responsive/responsive-component';
import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


const _responsiveStyle = {
  [EXTRA_WIDE]: DESKTOP,
  [DESKTOP]: {},
  [TABLET]: {},
  [MOBILE]: TABLET
};

export default class ResponsiveStyleComponent extends ResponsiveComponent {
  renderWithResponsiveStyle(style) {
    return <div/>;
  }

  responsiveStyle() {
    return {};
  }

  extractStyle(key) {
    let styleMap = assign({}, _responsiveStyle, this.responsiveStyle());
    let style = styleMap[key];
    if (typeof style === 'string') {
      style = styleMap[style];
    }
    // TODO: passing screen attribute is a temporary solution here, we need to fix the responsive-component to call
    // only one render for the screen size
    style.screen = key;

    return style;
  }

  renderExtraWide() {
    return this.renderWithResponsiveStyle(this.extractStyle(EXTRA_WIDE));
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

export { MOBILE, TABLET, DESKTOP, EXTRA_WIDE };
