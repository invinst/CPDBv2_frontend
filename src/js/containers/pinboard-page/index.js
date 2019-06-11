import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import { getPinboard, isEmptyPinboardSelector } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector, getCurrentTab } from 'selectors/pinboard-page/geographic-data';
import { isInitiallyLoading, shouldRedirect } from 'selectors/pinboard-page/redirection';
import { focusedItemSelector } from 'selectors/pinboard-page/focused-item';
import { changePinboardTab } from 'actions/pinboard';
import { focusItem } from 'actions/pinboard-page';
import { updatePathName } from 'actions/path-name';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    currentTab: getCurrentTab(state),
    hasMapMarker: hasMapMarkersSelector(state),
    isInitiallyLoading: isInitiallyLoading(state),
    shouldRedirect: shouldRedirect(state),
    isEmptyPinboard: isEmptyPinboardSelector(state),
    focusedItem: focusedItemSelector(state),
  };
}

const mapDispatchToProps = {
  changePinboardTab,
  focusItem,
  pushBreadcrumbs,
  updatePathName,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
