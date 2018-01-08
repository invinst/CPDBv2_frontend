import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import ActivityGridContainer from 'containers/landing-page/activity-grid';
import PropsRerender from 'components/common/higher-order/props-rerender';
import FooterContainer from 'containers/footer-container';
import HeatMap from './heat-map';



class LandingPage extends Component {
  componentDidMount() {
    this.props.resetBreadcrumbs({
      breadcrumbs: []
    });
  }

  renderWithResponsiveStyle(style) {
    return (
      <div>
        <HeatMap/>
        <ActivityGridContainer/>
        <FooterContainer />
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ {} }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

LandingPage.propTypes = {
  resetBreadcrumbs: PropTypes.func
};

export default PropsRerender(ConfiguredRadium(LandingPage));

