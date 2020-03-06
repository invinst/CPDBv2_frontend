import { connect } from 'react-redux';

import PinboardsMenu from 'components/common/pinboard/pinboards-menu';
import { pinboardsMenuSelector } from 'selectors/pinboard-page/pinboards-menu';
import { pinnableOfficerSelector } from 'selectors/officer-page/index';
import { fetchPinboardsMenu, fetchPinboard, createPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboards: pinboardsMenuSelector(state),
  item: pinnableOfficerSelector(state),

});

const mapDispatchToProps = {
  fetchPinboardsMenu,
  addOrRemoveItemInPinboard,
  createPinboard,
  fetchPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardsMenu);
