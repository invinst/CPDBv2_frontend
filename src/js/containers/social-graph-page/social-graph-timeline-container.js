import { connect } from 'react-redux';

import Timeline from 'components/social-graph-page/network/right-pane-section/timeline';
import { getSocialGraphTimelineItems } from 'selectors/social-graph-page/network-timeline';
import { trackingClickAttachment } from 'actions/common/analytic';

function mapStateToProps(state, ownProps) {
  return {
    items: getSocialGraphTimelineItems(state),
    pathname: `${ownProps.location.pathname}${ownProps.location.search}`
  };
}

const mapDispatchToProps = {
  onTrackingAttachment: trackingClickAttachment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
