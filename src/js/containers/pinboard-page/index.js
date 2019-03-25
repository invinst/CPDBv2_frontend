import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard';
import { graphDataSelector } from 'selectors/pinboard-page/social-graph';
import PinboardPage from 'components/pinboard-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    graphData: graphDataSelector(state)
  };
}

export default connect(mapStateToProps)(PinboardPage);
