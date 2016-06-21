import React from 'react';
import { assign } from 'lodash';

import ResponsiveComponent from 'components/responsive/responsive-component';
import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';

export { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


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
