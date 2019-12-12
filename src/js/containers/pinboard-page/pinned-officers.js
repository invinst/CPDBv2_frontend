import { connect } from 'react-redux';

import {
  removeItemInPinboardPage,
  completeRemoveItemFromPinboard,
  addItemInPinboardPage,
  orderPinboard,
} from 'actions/pinboard';
import PinnedType from 'components/pinboard-page/pinned-type';
import { pinnedOfficersSelector, getPinnedOfficersRequesting } from 'selectors/pinboard-page/items';
import { focusItem } from 'actions/pinboard-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    type: 'OFFICER',
    title: 'OFFICERS',
    items: pinnedOfficersSelector(state),
    requesting: getPinnedOfficersRequesting(state),
  };
}

const mapDispatchToProps = {
  removeItemInPinboardPage,
  completeRemoveItemFromPinboard,
  addItemInPinboardPage,
  orderPinboard,
  focusItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinnedType);
