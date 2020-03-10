import { connect } from 'react-redux';

import PinboardsMenu from 'components/common/pinboard/pinboards-menu';
import { pinnableOfficerSelector } from 'selectors/officer-page';
import { fetchPinboardsMenu, fetchPinboard, createPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';
import { officerPinboardsMenuSelector } from 'selectors/officer-page/pinboards-menu';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboards: officerPinboardsMenuSelector(state),
  item: pinnableOfficerSelector(state),
});

const mapDispatchToProps = {
  fetchPinboardsMenu,
  addOrRemoveItemInPinboard,
  createPinboard,
  fetchPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardsMenu);
