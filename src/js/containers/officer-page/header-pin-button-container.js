import { connect } from 'react-redux';

import HeaderPinButton from 'components/common/pinboard/header-pin-button';
import { isOfficerPinnedSelector, pinnableOfficerSelector } from 'selectors/officer-page';
import { showSelectPinboardsSelector } from 'selectors/common/pinboards';
import { fetchPinboard, createNewPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';
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
  addOrRemoveItemInPinboard,
  createPinboard: createNewPinboard,
  fetchPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPinButton);
