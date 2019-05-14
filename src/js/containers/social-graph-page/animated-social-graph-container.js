import { connect } from 'react-redux';

import {
  getSocialGraphTimelineIdx,
  getSocialGraphRefreshIntervalId
} from 'selectors/social-graph-page/network-timeline';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import {
  updateSocialGraphTimelineIdx,
  updateOfficerId,
  updateSocialGraphRefreshIntervalId
} from 'actions/social-graph-page';
import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
} from 'selectors/social-graph-page/network';


function mapStateToProps(state, ownProps) {
  return {
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
    timelineIdx: getSocialGraphTimelineIdx(state),
    refreshIntervalId: getSocialGraphRefreshIntervalId(state),
  };
}

const mapDispatchToProps = {
  updateOfficerId,
  updateTimelineIdx: updateSocialGraphTimelineIdx,
  updateRefreshIntervalId: updateSocialGraphRefreshIntervalId,
};


export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSocialGraph);
