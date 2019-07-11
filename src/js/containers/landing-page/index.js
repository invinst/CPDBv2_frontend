import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset as resetBreadcrumbs } from 'redux-breadcrumb-trail';

import LandingPage from 'components/landing-page';
import { openVideoModal } from 'actions/video-modal';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  };
}

const mapDispatchToProps = {
  resetBreadcrumbs,
  openVideoModal,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
