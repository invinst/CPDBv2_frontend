import PropTypes from 'prop-types';
import React from 'react';
import { assign } from 'lodash';

import ResponsiveComponent from 'components/responsive/responsive-component';
import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


const _responsiveStyle = {
  [EXTRA_WIDE]: DESKTOP,
  [DESKTOP]: {},
  [TABLET]: {},
  [MOBILE]: TABLET,
};

export default function ResponsiveStyleComponent(props) {
  function extractStyle(key) {
    const { responsiveStyle } = props;
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

  function renderExtraWide() {
    const { children } = props;
    return children(extractStyle(EXTRA_WIDE));
  }

  function renderDesktop() {
    const { children } = props;
    return children(extractStyle(DESKTOP));
  }

  function renderTablet() {
    const { children } = props;
    return children(extractStyle(TABLET));
  }

  function renderMobile() {
    const { children } = props;
    return children(extractStyle(MOBILE));
  }

  const { style } = props;
  return (
    <ResponsiveComponent
      mobileChildren={ renderMobile() }
      tabletChildren={ renderTablet() }
      desktopChildren={ renderDesktop() }
      extraWideChildren={ renderExtraWide() }
      style={ style }
    />
  );
}

ResponsiveStyleComponent.propTypes = {
  style: PropTypes.object,
  children: PropTypes.func,
  responsiveStyle: PropTypes.object,
};

export { MOBILE, TABLET, DESKTOP, EXTRA_WIDE };
