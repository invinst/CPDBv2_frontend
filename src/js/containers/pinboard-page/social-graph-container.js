import { connect } from 'react-redux';

import { graphDataSelector } from 'selectors/pinboard-page/social-graph';
import AnimatedSocialGraph from 'components/common/animated-social-graph';

function mapStateToProps(state, ownProps) {
  return {
    officers: graphDataSelector(state).officers,
    coaccusedData: graphDataSelector(state).coaccusedData,
    listEvent: graphDataSelector(state).listEvent,
    hasIntercom: true
  };
}

export default connect(mapStateToProps)(AnimatedSocialGraph);
