import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import SearchSectionComponent from 'components/landing-page/search-section';
import ActivityGridContainer from 'containers/landing-page/activity-grid';
import PropsRerender from 'components/common/higher-order/props-rerender';
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
        <SearchSectionComponent />
        <HeatMap/>
        <ActivityGridContainer/>
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

