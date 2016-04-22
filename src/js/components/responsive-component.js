import React from 'react';
import MediaQuery from 'react-responsive';

let PropTypes = React.PropTypes;


let MOBILE_BREAK_POINT = 768;
let TABLET_BREAK_POINT = 992;

let MOBILE_DEVICE = 'mobile';
let TABLET_DEVICE = 'tablet';
let DESKTOP_DEVICE = 'desktop';


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
    if (this.props.device === MOBILE_DEVICE) {
      return this.renderMobile();
    } else if (this.props.device === TABLET_DEVICE ) {
      return this.renderTablet();
    } else if (this.props.device === DESKTOP_DEVICE ) {
      return this.renderDesktop();
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
