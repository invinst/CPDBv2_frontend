import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import SearchSectionComponent from 'components/landing-page/search-section';
import ActivityGridContainer from 'containers/activity-grid';
import PropsRerender from 'components/common/higher-order/props-rerender';


class LandingPage extends Component {
  responsiveStyle() {
    return {};
  }

  renderWithResponsiveStyle(style) {
    return (
      <div>
        <SearchSectionComponent />
        <ActivityGridContainer/>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

LandingPage.propTypes = {
  store: PropTypes.object,
  vftgSection: PropTypes.object,
  requestLandingPage: PropTypes.func
};

LandingPage.contextTypes = {
  adapter: PropTypes.func
};

export default PropsRerender(ConfiguredRadium(LandingPage));
