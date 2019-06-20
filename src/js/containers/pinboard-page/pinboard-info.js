import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard-page/pinboard';
import PinboardInfo from 'components/pinboard-page/pinboard-info';
import { updatePinboardInfo } from 'actions/pinboard';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
  };
}

const mapDispatchToProps = {
  updatePinboardInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(PinboardInfo);
