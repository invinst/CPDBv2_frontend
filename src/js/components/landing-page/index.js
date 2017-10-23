import React, { Component } from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import SearchSectionComponent from 'components/landing-page/search-section';
import ActivityGridContainer from 'containers/landing-page/activity-grid';
import PropsRerender from 'components/common/higher-order/props-rerender';
import HeroSection from './hero-section';


class LandingPage extends Component {
  responsiveStyle() {
    return {};
  }

  renderWithResponsiveStyle(style) {
    return (
      <div>
        <SearchSectionComponent />
        <HeroSection />
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

export default PropsRerender(ConfiguredRadium(LandingPage));
