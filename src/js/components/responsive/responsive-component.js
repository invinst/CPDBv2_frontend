import React, {PropTypes} from 'react';
import MediaQuery from 'react-responsive';


const MOBILE_BREAK_POINT = 768;
const TABLET_BREAK_POINT = 992;

let DEVICE_RENDERERS = {
  mobile: 'renderMobile',
  tablet: 'renderTablet',
  desktop: 'renderDesktop'
};


export default class ResponsiveComponent extends React.Component {
  renderMobile() {
    return <div/>;
  }

  renderTablet() {
    return <div/>;
  }

  renderDesktop() {
    return <div/>;
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
          <MediaQuery minWidth={ TABLET_BREAK_POINT }>
            { this.renderDesktop() }
          </MediaQuery>
        </div>
      );
    }
  }
}

ResponsiveComponent.propTypes = {
  device: PropTypes.string // this allow setting screen size for testing purpose
};
