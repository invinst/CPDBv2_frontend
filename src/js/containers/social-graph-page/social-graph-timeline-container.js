import { connect } from 'react-redux';

import Timeline from 'components/social-graph-page/network/right-pane-section/timeline';
import {
  socialGraphTimelineItemsSelector,
  getSocialGraphRefreshIntervalId,
  getSocialGraphTimelineIdx,
  getTimelineIdxTriggerChange,
} from 'selectors/social-graph-page/network-timeline';
import { trackingClickAttachment } from 'actions/common/analytic';
import { updateSocialGraphTimelineIdxFromTimelineTab, } from 'actions/social-graph-page';


function mapStateToProps(state, ownProps) {
  return {
    items: socialGraphTimelineItemsSelector(state),
    pathname: `${ownProps.location.pathname}${ownProps.location.search}`,
    timelineIdx: getSocialGraphTimelineIdx(state),
    refreshIntervalId: getSocialGraphRefreshIntervalId(state),
    timelineIdxTriggerChange: getTimelineIdxTriggerChange(state),
  };
}

const mapDispatchToProps = {
  onTrackingAttachment: trackingClickAttachment,
  updateTimelineIdx: updateSocialGraphTimelineIdxFromTimelineTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
