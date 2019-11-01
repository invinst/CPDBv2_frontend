import { connect } from 'react-redux';

import { fetchAllPinboards } from 'actions/pinboard-admin';
import { fetchPinboardSocialGraph } from 'actions/pinboard';
import PinboardAdminPage from 'components/pinboard-admin-page';
import {
  allPinboardsSelector,
  nextParamsSelector,
  hasMoreSelector,
  getIsLoading,
} from 'selectors/pinboard-admin-page';
import { getCachedData } from 'selectors/pinboard-page/social-graph';

function mapStateToProps(state, ownProps) {
  return {
    pinboards: allPinboardsSelector(state),
    nextParams: nextParamsSelector(state),
    hasMore: hasMoreSelector(state),
    isLoading: getIsLoading(state),
    cachedSocialGraphData: getCachedData(state),
  };
}

const mapDispatchToProps = {
  fetchPinboards: fetchAllPinboards,
  fetchPinboardSocialGraph,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardAdminPage);
