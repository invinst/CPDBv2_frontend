import { connect } from 'react-redux';
import React from 'react';

import { requestLandingPage } from 'actions/landing-page';
import LandingPage from 'components/landing-page';


const mapDispatchToProps = {
  requestLandingPage
};

export default connect(null, mapDispatchToProps)(LandingPage);

