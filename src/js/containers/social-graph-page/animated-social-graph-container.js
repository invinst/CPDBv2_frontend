import { connect } from 'react-redux';

import {
  getSocialGraphTimelineIdx,
  getSocialGraphRefreshIntervalId
} from 'selectors/social-graph-page/network-timeline';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import {
  updateSocialGraphTimelineIdx,
  updateSelectedOfficerId,
  updateSocialGraphRefreshIntervalId,
  updateSocialGraphSelectedEdge,
} from 'actions/social-graph-page';
import {
  officersSelector,
  coaccusedDataSelector,
  getListEvent,
  getSelectedOfficerId,
  selectedEdgeDataSelector,
} from 'selectors/social-graph-page/network';


function mapStateToProps(state, ownProps) {
  return {
    officers: officersSelector(state),
    coaccusedData: coaccusedDataSelector(state),
    listEvent: getListEvent(state),
    timelineIdx: getSocialGraphTimelineIdx(state),
    refreshIntervalId: getSocialGraphRefreshIntervalId(state),
    selectedOfficerId: getSelectedOfficerId(state),
    selectedEdge: selectedEdgeDataSelector(state),
  };
}

const mapDispatchToProps = {
  updateSelectedOfficerId,
  updateTimelineIdx: updateSocialGraphTimelineIdx,
  updateRefreshIntervalId: updateSocialGraphRefreshIntervalId,
  updateSelectedEdge: updateSocialGraphSelectedEdge,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSocialGraph);
