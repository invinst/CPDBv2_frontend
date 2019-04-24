import { connect } from 'react-redux';

import TimelineSection from 'components/social-graph-page/social-graph-pane-section/timeline-section';
import { officersSelector } from 'selectors/social-graph-page';

function mapStateToProps(state, ownProps) {
  return {
    officers: officersSelector(state),
  };
}

export default connect(mapStateToProps)(TimelineSection);
