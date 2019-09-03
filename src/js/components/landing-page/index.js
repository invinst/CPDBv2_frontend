import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';

import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import SlimHeader from 'components/headers/slim-header';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import styles from './landing-page.sass';


class LandingPage extends Component {
  componentDidMount() {
    this.props.resetBreadcrumbs({
      breadcrumbs: [],
    });
  }

  renderWithResponsiveStyle(style) {
    const { pathname } = this.props;
    return (
      <div className={ styles.landingPage }>
        <SlimHeader pathname={ pathname }/>
        <HeatMap/>
        <div className='landing-page-carousel-wrapper'>
          <OfficersByAllegationContainer className='landing-page-carousel' pathname={ pathname }/>
          <RecentActivityContainer className='landing-page-carousel' pathname={ pathname }/>
          <RecentDocumentContainer className='landing-page-carousel' pathname={ pathname }/>
          <ComplaintSummariesContainer className='landing-page-carousel' pathname={ pathname }/>
        </div>
        <FooterContainer/>
      </div>
    );
  }

  render() {
    return (
      <DocumentMeta title='CPDP'>
        <ResponsiveStyleComponent responsiveStyle={ {} }>
          { this.renderWithResponsiveStyle.bind(this) }
        </ResponsiveStyleComponent>
      </DocumentMeta>
    );
  }
}

LandingPage.propTypes = {
  resetBreadcrumbs: PropTypes.func,
  pathname: PropTypes.string,
};

LandingPage.contextTypes = {
  editModeOn: PropTypes.bool,
};

export default ConfiguredRadium(LandingPage);

