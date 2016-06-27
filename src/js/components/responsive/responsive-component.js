import React, { PropTypes } from 'react';
import MediaQuery from 'react-responsive';

import {
  MOBILE_BREAK_POINT, TABLET_BREAK_POINT, DESKTOP_BREAK_POINT,
  MOBILE, TABLET, DESKTOP, EXTRA_WIDE
} from 'utils/constants';


let DEVICE_RENDERERS = {
  [MOBILE]: 'renderMobile',
  [TABLET]: 'renderTablet',
  [DESKTOP]: 'renderDesktop',
  [EXTRA_WIDE]: 'renderExtraWide'
};


export default class ResponsiveComponent extends React.Component {
  renderMobile() {
    return this.renderTablet();
  }

  renderTablet() {
    return <div/>;
  }

  renderDesktop() {
    return <div/>;
  }

  renderExtraWide() {
    return this.renderDesktop();
  }

  render() {
    let renderer = DEVICE_RENDERERS[this.props.device];
    if (renderer) {
      return this[renderer]();
    } else {
      return (
        <div>
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
  device: PropTypes.string // this allow setting screen size for testing purpose
};
