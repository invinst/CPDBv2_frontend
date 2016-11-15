import { connect } from 'react-redux';
import React from 'react';

import { requestLandingPage } from 'actions/landing-page';
import LandingPage from 'components/landing-page';


function mapStateToProps(state, ownProps) {
  return {
    heroSection: state.landingPage.heroSection
  };
}

const mapDispatchToProps = {
  requestLandingPage
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
