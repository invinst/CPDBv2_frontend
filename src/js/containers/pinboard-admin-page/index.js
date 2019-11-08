import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { fetchAllPinboards } from 'actions/pinboard-admin-page';
import { fetchPinboardSocialGraph } from 'actions/pinboard';
import { openLoginModal } from 'actions/authentication';
import PinboardAdminPage from 'components/pinboard-admin-page';
import {
  allPinboardsSelector,
  nextParamsSelector,
  hasMoreSelector,
  getIsLoading,
} from 'selectors/pinboard-admin-page';
import { cachedDataIDsSelector } from 'selectors/pinboard-page/social-graph';
import { isSignedIn } from 'selectors/log-out';

function mapStateToProps(state, ownProps) {
  return {
    pinboards: allPinboardsSelector(state),
    nextParams: nextParamsSelector(state),
    hasMore: hasMoreSelector(state),
    isLoading: getIsLoading(state),
    cachedDataIDs: cachedDataIDsSelector(state),
    isSignedIn: isSignedIn(state),
  };
}

const mapDispatchToProps = {
  fetchPinboards: fetchAllPinboards,
  fetchPinboardSocialGraph,
  openLoginModal,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardAdminPage));
