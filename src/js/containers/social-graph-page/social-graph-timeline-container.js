import { connect } from 'react-redux';

import TimelineSection from 'components/social-graph-page/network/right-pane-section/timeline-section';
import { allegationsSelector } from 'selectors/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    allegations: allegationsSelector(state),
  };
}

export default connect(mapStateToProps)(TimelineSection);
