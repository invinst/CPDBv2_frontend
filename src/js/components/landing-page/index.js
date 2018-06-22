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
import { carouselsWrapperStyle, carouselStyle } from './landing-page.style';


class LandingPage extends Component {
  renderWithResponsiveStyle(style) {
    const { pathname } = this.props;
    return (
      <div>
        <SlimHeader pathname={ pathname } />
        <HeatMap/>
        <div style={ carouselsWrapperStyle }>
          <div style={ carouselStyle }>
            <OfficersByAllegationContainer pathname={ pathname }/>
          </div>
          <div style={ carouselStyle }>
            <RecentActivityContainer pathname={ pathname }/>
          </div>
          <div style={ carouselStyle }>
            <RecentDocumentContainer pathname={ pathname }/>
          </div>
          <div style={ carouselStyle }>
            <ComplaintSummariesContainer pathname={ pathname }/>
          </div>
        </div>
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

