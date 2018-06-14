import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';

import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import SlimHeader from 'components/headers/slim-header';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';


class LandingPage extends Component {
  renderWithResponsiveStyle(style) {
    return (
      <div>
        <SlimHeader pathname={ this.props.pathname } />
        <HeatMap/>
        <OfficersByAllegationContainer pathname={ this.props.pathname }/>
        <RecentActivityContainer pathname={ this.props.pathname }/>
        <RecentDocumentContainer pathname={ this.props.pathname }/>
        <ComplaintSummariesContainer pathname={ this.props.pathname }/>
        <FooterContainer/>
      </div>
    );
  }

  render() {
    return (
      <DocumentTitle title='CPDP'>
        <ResponsiveStyleComponent responsiveStyle={ {} }>
          { this.renderWithResponsiveStyle.bind(this) }
        </ResponsiveStyleComponent>
      </DocumentTitle>
    );
  }
}

LandingPage.propTypes = {
  resetBreadcrumbs: PropTypes.func,
  pathname: PropTypes.string
};

LandingPage.contextTypes = {
  editModeOn: PropTypes.bool
};

export default ConfiguredRadium(LandingPage);

