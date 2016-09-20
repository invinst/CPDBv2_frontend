import { connect } from 'react-redux';
import React from 'react';

import { requestLandingPage } from 'actions/landing-page';
import LandingPage from 'components/landing-page';


function mapStateToProps(state, ownProps) {
  return {
    vftgSection: state.landingPage.vftgSection,
    heroSection: state.landingPage.heroSection,
    aboutSection: state.landingPage.aboutSection,
    collaborateSection: state.landingPage.collaborateSection
  };
}

const mapDispatchToProps = {
  requestLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
