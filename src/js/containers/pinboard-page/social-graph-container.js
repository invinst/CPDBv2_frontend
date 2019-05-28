import { connect } from 'react-redux';

import { graphDataSelector, getExpandedLink } from 'selectors/pinboard-page/social-graph';
import AnimatedSocialGraph from 'components/common/animated-social-graph';

function mapStateToProps(state, ownProps) {
  return {
    officers: graphDataSelector(state).officers,
    coaccusedData: graphDataSelector(state).coaccusedData,
    listEvent: graphDataSelector(state).listEvent,
    hasIntercom: true,
    expandedLink: getExpandedLink(state.pathname),
    isVisible: ownProps.isVisible
  };
}

export default connect(mapStateToProps)(AnimatedSocialGraph);
