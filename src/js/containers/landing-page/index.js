import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset as resetBreadcrumb } from 'redux-breadcrumb-trail';

import LandingPage from 'components/landing-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}

const mapDispatchToProps = {
  resetBreadcrumb
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
