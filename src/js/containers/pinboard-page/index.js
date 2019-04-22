import { connect } from 'react-redux';

import { getPinboard, getPinboardItems } from 'selectors/pinboard';
import { removeItemInPinboardPage } from 'actions/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector, getCurrentTab } from 'selectors/pinboard-page/geographic-data';
import { changePinboardTab } from 'actions/pinboard';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    itemsByTypes: getPinboardItems(state),
    currentTab: getCurrentTab(state),
    hasMapMarker: hasMapMarkersSelector(state),
  };
}

const mapDispatchToProps = {
  removeItemInPinboardPage,
  changePinboardTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
