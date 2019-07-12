import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { reset as resetBreadcrumbs } from 'redux-breadcrumb-trail';

import LandingPage from 'components/landing-page';
import { openVideoModal } from 'actions/video-modal';
import { thumbnailUrlSelector } from 'selectors/headers/slim-header';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    videoThumbnailUrl: thumbnailUrlSelector(state),
  };
}

const mapDispatchToProps = {
  resetBreadcrumbs,
  openVideoModal,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingPage));
