import { connect } from 'react-redux';

import { getPinboard, getPinboardItems } from 'selectors/pinboard';
import { removeItemInPinboardPage } from 'actions/pinboard';
import PinboardPage from 'components/pinboard-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    itemsByTypes: getPinboardItems(state),
  };
}

const mapDispatchToProps = {
  removeItemInPinboardPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardPage);
