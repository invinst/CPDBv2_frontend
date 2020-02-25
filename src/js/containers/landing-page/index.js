import { connect } from 'react-redux';

import LandingPage from 'components/landing-page';


function mapStateToProps(state, ownProps) {
  return ownProps;
}

export default connect(mapStateToProps)(LandingPage);
