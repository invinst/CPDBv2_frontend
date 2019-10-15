import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import { getPinboard, isEmptyPinboardSelector, getInitialRequested } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector } from 'selectors/pinboard-page/geographic-data';
import { shouldRedirect } from 'selectors/pinboard-page/redirect';
import { focusedItemSelector } from 'selectors/pinboard-page/focused-item';
import { createNewEmptyPinboard, duplicatePinboard } from 'actions/pinboard';
import {
  focusItem,
  addOrRemoveItemInPinboardFromPreviewPane,
  showPinboardsList,
} from 'actions/pinboard-page';
import { updatePathName } from 'actions/path-name';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    initialRequested: getInitialRequested(state),
    shouldRedirect: shouldRedirect(state),
    isEmptyPinboard: isEmptyPinboardSelector(state),
    focusedItem: focusedItemSelector(state),
    hasMapMarker: hasMapMarkersSelector(state),
  };
}

const mapDispatchToProps = {
  focusItem,
  pushBreadcrumbs,
  updatePathName,
  addOrRemoveItemInPinboardFromPreviewPane,
  showPinboardsList,
  createNewEmptyPinboard,
  duplicatePinboard,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
