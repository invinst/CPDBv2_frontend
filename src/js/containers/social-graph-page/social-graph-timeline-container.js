import { connect } from 'react-redux';

import { TimelineWithSpinner } from 'components/social-graph-page/network/right-pane-section/timeline';
import {
  socialGraphTimelineItemsSelector,
  getSocialGraphRefreshIntervalId,
  getSocialGraphTimelineIdx,
  getTimelineIdxTriggerChange,
  getNetworkAllegationsRequesting,
} from 'selectors/social-graph-page/network-timeline';
import { trackingClickAttachment } from 'actions/common/analytic';
import {
  updateSocialGraphTimelineIdxFromTimelineTab,
  updateSocialGraphSelectedCrid,
} from 'actions/social-graph-page';
import { hasComplaintSummarySelector } from 'selectors/pinboard-page/widgets/complaint-summary';


function mapStateToProps(state, ownProps) {
  return {
    items: socialGraphTimelineItemsSelector(state),
    hasComplaintSummary: hasComplaintSummarySelector(state),
    pathname: `${ownProps.location.pathname}${ownProps.location.search}`,
    timelineIdx: getSocialGraphTimelineIdx(state),
    refreshIntervalId: getSocialGraphRefreshIntervalId(state),
    timelineIdxTriggerChange: getTimelineIdxTriggerChange(state),
    requesting: getNetworkAllegationsRequesting(state),
  };
}

const mapDispatchToProps = {
  onTrackingAttachment: trackingClickAttachment,
  updateTimelineIdx: updateSocialGraphTimelineIdxFromTimelineTab,
  updateSelectedCrid: updateSocialGraphSelectedCrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineWithSpinner);
