import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard';
import PinboardPage from 'components/pinboard-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state)
  };
}

export default connect(mapStateToProps)(PinboardPage);
