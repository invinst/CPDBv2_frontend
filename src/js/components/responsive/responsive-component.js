import PropTypes from 'prop-types';
import React from 'react';
import MediaQuery from 'react-responsive';

import {
  MOBILE_BREAK_POINT, TABLET_BREAK_POINT, DESKTOP_BREAK_POINT,
  MOBILE, TABLET, DESKTOP, EXTRA_WIDE,
} from 'utils/constants';


let DEVICE_RENDERERS = {
  [MOBILE]: 'renderMobile',
  [TABLET]: 'renderTablet',
  [DESKTOP]: 'renderDesktop',
  [EXTRA_WIDE]: 'renderExtraWide',
};


export default class ResponsiveComponent extends React.Component {
  renderMobile() {
    const { mobileChildren, tabletChildren } = this.props;
    return mobileChildren ? mobileChildren : tabletChildren;
  }

  renderTablet() {
    return this.props.tabletChildren;
  }

  renderDesktop() {
    return this.props.desktopChildren;
  }

  renderExtraWide() {
    const { extraWideChildren, desktopChildren } = this.props;
    return extraWideChildren ? extraWideChildren : desktopChildren;
  }

  render() {
    const { style } = this.props;
    let renderer = DEVICE_RENDERERS[this.props.device];
    if (renderer) {
      return this[renderer]();
    } else {
      return (
        <div style={ style }>
          <MediaQuery maxWidth={ MOBILE_BREAK_POINT - 1 }>
            { this.renderMobile() }
          </MediaQuery>
          <MediaQuery minWidth={ MOBILE_BREAK_POINT } maxWidth={ TABLET_BREAK_POINT - 1 }>
            { this.renderTablet() }
          </MediaQuery>
          <MediaQuery minWidth={ TABLET_BREAK_POINT } maxWidth={ DESKTOP_BREAK_POINT - 1 }>
            { this.renderDesktop() }
          </MediaQuery>
          <MediaQuery minWidth={ DESKTOP_BREAK_POINT }>
            { this.renderExtraWide() }
          </MediaQuery>
        </div>
      );
    }
  }
}

ResponsiveComponent.propTypes = {
  mobileChildren: PropTypes.node,
  tabletChildren: PropTypes.node,
  desktopChildren: PropTypes.node,
  extraWideChildren: PropTypes.node,
  style: PropTypes.object,
  device: PropTypes.string, // this allow setting screen size for testing purpose
};
