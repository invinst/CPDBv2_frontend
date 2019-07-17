import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import { getPinboard, isEmptyPinboardSelector, examplePinboardsSelector } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector } from 'selectors/pinboard-page/geographic-data';
import { getCurrentTab, pinboardPaneSectionRequestingSelector } from 'selectors/pinboard-page/pinboard-pane-section';
import { shouldRedirect } from 'selectors/pinboard-page/redirect';
import { getInitialRequested } from 'selectors/pinboard-page/pinboard';
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
    initialRequested: getInitialRequested(state),
    shouldRedirect: shouldRedirect(state),
    isEmptyPinboard: isEmptyPinboardSelector(state),
    focusedItem: focusedItemSelector(state),
    examplePinboards: examplePinboardsSelector(state),
    requesting: pinboardPaneSectionRequestingSelector(state),
  };
}

const mapDispatchToProps = {
  changePinboardTab,
  focusItem,
  pushBreadcrumbs,
  updatePathName,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
