import { connect } from 'react-redux';

import PinboardsMenu from 'components/common/pinboard/pinboards-menu';
import { pinnableCrSelector } from 'selectors/cr-page';
import { fetchPinboardsMenu, fetchPinboard, createPinboard, addOrRemoveItemInPinboard } from 'actions/pinboard';
import { crPinboardsMenuSelector } from 'selectors/cr-page/pinboards-menu';


const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  pinboards: crPinboardsMenuSelector(state),
  item: pinnableCrSelector(state),
});

const mapDispatchToProps = {
  fetchPinboardsMenu,
  addOrRemoveItemInPinboard,
  createPinboard,
  fetchPinboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardsMenu);
