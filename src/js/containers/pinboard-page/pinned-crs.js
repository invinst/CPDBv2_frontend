import { connect } from 'react-redux';

import { removeItemInPinboardPage, orderPinboard } from 'actions/pinboard';
import PinnedType from 'components/pinboard-page/pinned-type';
import { pinnedCRsSelector, getPinnedCRsRequesting } from 'selectors/pinboard-page/items';
import { focusItem } from 'actions/pinboard-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    type: 'CR',
    title: 'COMPLAINTS',
    items: pinnedCRsSelector(state),
    requesting: getPinnedCRsRequesting(state),
  };
}

const mapDispatchToProps = {
  removeItemInPinboardPage,
  orderPinboard,
  focusItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinnedType);
