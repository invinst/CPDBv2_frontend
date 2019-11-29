import { connect } from 'react-redux';

import { fetchAllPinboards, clearPinboardStaticSocialGraphCache } from 'actions/pinboard-admin-page';
import { fetchPinboardStaticSocialGraph } from 'actions/pinboard-admin-page';
import PinboardAdminPage from 'components/pinboard-admin-page';
import {
  allPinboardsSelector,
  nextParamsSelector,
  hasMoreSelector,
  getIsLoading,
} from 'selectors/pinboard-admin-page';
import { cachedDataIDsSelector } from 'selectors/pinboard-admin-page/social-graph';

function mapStateToProps(state, ownProps) {
  return {
    pinboards: allPinboardsSelector(state),
    nextParams: nextParamsSelector(state),
    hasMore: hasMoreSelector(state),
    isLoading: getIsLoading(state),
    cachedDataIDs: cachedDataIDsSelector(state),
  };
}

const mapDispatchToProps = {
  fetchPinboards: fetchAllPinboards,
  fetchPinboardStaticSocialGraph,
  clearPinboardStaticSocialGraphCache,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardAdminPage);
