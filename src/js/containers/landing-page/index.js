import { connect } from 'react-redux';
import React from 'react';

import { requestLandingPage, updateLandingPage } from 'actions/landing-page';
import { collaborateSectionSelector } from 'selectors/landing-page/landing-page-content-selector';
import LandingPage from 'components/landing-page';


function mapStateToProps(state, ownProps) {
  return {
    vftgSection: state.landingPage.vftgSection,
    heroSection: state.landingPage.heroSection,
    aboutSection: state.landingPage.aboutSection,
    collaborateSection: collaborateSectionSelector(state)
  };
}

const mapDispatchToProps = {
  requestLandingPage,
  updateLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
