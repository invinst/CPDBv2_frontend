import React, { PropTypes, Component } from 'react';
import { assign } from 'lodash';

import ResponsiveComponent from 'components/responsive/responsive-component';
import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


const _responsiveStyle = {
  [EXTRA_WIDE]: DESKTOP,
  [DESKTOP]: {},
  [TABLET]: {},
  [MOBILE]: TABLET,
};

export default class ResponsiveStyleComponent extends Component {
  extractStyle(key) {
    const { responsiveStyle } = this.props;
    let styleMap = assign({}, _responsiveStyle, responsiveStyle);
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
    const { children } = this.props;
    return children(this.extractStyle(EXTRA_WIDE));
  }

  renderDesktop() {
    const { children } = this.props;
    return children(this.extractStyle(DESKTOP));
  }

  renderTablet() {
    const { children } = this.props;
    return children(this.extractStyle(TABLET));
  }

  renderMobile() {
    const { children } = this.props;
    return children(this.extractStyle(MOBILE));
  }

  render() {
    const { style } = this.props;
    return (
      <ResponsiveComponent
        mobileChildren={ this.renderMobile() }
        tabletChildren={ this.renderTablet() }
        desktopChildren={ this.renderDesktop() }
        extraWideChildren={ this.renderExtraWide() }
        style={ style }/>
    );
  }
}

ResponsiveStyleComponent.propTypes = {
  style: PropTypes.object,
  children: PropTypes.func,
  responsiveStyle: PropTypes.object,
};

export { MOBILE, TABLET, DESKTOP, EXTRA_WIDE };
