import { connect } from 'react-redux';

import HeaderPinButton from 'components/common/pinboard/header-pin-button';
import { pinnableCrSelector, isCrPinnedSelector } from 'selectors/cr-page';
import { showSelectPinboardsSelector } from 'selectors/common/pinboards';
import { fetchPinboard, createNewPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';
import { crPinboardsMenuSelector } from 'selectors/cr-page/pinboards-menu';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    isPinned: isCrPinnedSelector(state),
    item: pinnableCrSelector(state),
    showSelectPinboards: showSelectPinboardsSelector(state),
    pinboards: crPinboardsMenuSelector(state),
  };
}

const mapDispatchToProps = {
  addOrRemoveItemInPinboard,
  createPinboard: createNewPinboard,
  fetchPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPinButton);
