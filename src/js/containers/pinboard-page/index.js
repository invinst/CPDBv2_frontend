import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector, getCurrentTab } from 'selectors/pinboard-page/geographic-data';
import { isInitiallyLoading, shouldRedirect } from 'selectors/pinboard-page/redirection';
import { changePinboardTab } from 'actions/pinboard';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    currentTab: getCurrentTab(state),
    hasMapMarker: hasMapMarkersSelector(state),
    isInitiallyLoading: isInitiallyLoading(state),
    shouldRedirect: shouldRedirect(state),
  };
}

const mapDispatchToProps = {
  changePinboardTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
