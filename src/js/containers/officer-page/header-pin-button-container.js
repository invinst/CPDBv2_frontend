import { connect } from 'react-redux';

import HeaderPinButton from 'components/common/pinboard/header-pin-button';
import { isOfficerPinnedSelector, pinnableOfficerSelector } from 'selectors/officer-page';
import { showSelectPinboardsSelector } from 'selectors/common/pinboard';
import { fetchHeaderPinboards, fetchPinboard, createPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';
import { officerPinboardsMenuSelector } from 'selectors/officer-page/pinboards-menu';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isPinned: isOfficerPinnedSelector(state),
    item: pinnableOfficerSelector(state),
    showSelectPinboards: showSelectPinboardsSelector(state),
    pinboards: officerPinboardsMenuSelector(state),
  };
}

const mapDispatchToProps = {
  fetchHeaderPinboards,
  addOrRemoveItemInPinboard,
  createPinboard,
  fetchPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPinButton);
