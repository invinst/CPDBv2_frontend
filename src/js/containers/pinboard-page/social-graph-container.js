import { connect } from 'react-redux';

import { graphDataSelector, getRequesting, getExpandedLink } from 'selectors/pinboard-page/social-graph';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';

function mapStateToProps(state, ownProps) {
  return {
    requesting: getRequesting(state),
    officers: graphDataSelector(state).officers,
    coaccusedData: graphDataSelector(state).coaccusedData,
    listEvent: graphDataSelector(state).listEvent,
    hasIntercom: true,
    expandedLink: getExpandedLink(state.pathname),
  };
}

export default connect(mapStateToProps)(AnimatedSocialGraphWithSpinner);
