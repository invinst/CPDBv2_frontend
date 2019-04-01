import { connect } from 'react-redux';

import { getPinboard } from 'selectors/pinboard';
import { graphDataSelector } from 'selectors/pinboard-page/social-graph';
import { relevantCoaccusalsSelector } from 'selectors/pinboard-page/relevant-coaccusals';
import PinboardPage from 'components/pinboard-page';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    graphData: graphDataSelector(state),
    relevantCoaccusals: relevantCoaccusalsSelector(state),
  };
}

export default connect(mapStateToProps)(PinboardPage);
