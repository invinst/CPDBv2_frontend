import React, { Component, PropTypes } from 'react';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';

import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';


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
        <OfficersByAllegationContainer/>
        <RecentActivityContainer/>
        <RecentDocumentContainer/>
        <ComplaintSummariesContainer/>
        <FooterContainer/>
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

export default ConfiguredRadium(LandingPage);

