import { connect } from 'react-redux';

import {
  getSocialGraphTimelineIdx,
  getSocialGraphRefreshIntervalId,
} from 'selectors/social-graph-page/network-timeline';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import {
  updateSocialGraphTimelineIdx,
  updateSelectedOfficerId,
  updateSocialGraphRefreshIntervalId,
  updateSocialGraphSelectedEdge,
} from 'actions/social-graph-page';
import {
  graphDataSelector,
  getSelectedOfficerId,
  selectedEdgeDataSelector,
  getRequesting,
} from 'selectors/social-graph-page/network';


function mapStateToProps(state, ownProps) {
  const graphData = graphDataSelector(state);
  return {
    performResizeGraph: ownProps.performResizeGraph,
    customRightControlButton: ownProps.customRightControlButton,
    officers: graphData.officers,
    coaccusedData: graphData.coaccusedData,
    listEvent: graphData.listEvent,
    timelineIdx: getSocialGraphTimelineIdx(state),
    refreshIntervalId: getSocialGraphRefreshIntervalId(state),
    selectedOfficerId: getSelectedOfficerId(state),
    selectedEdge: selectedEdgeDataSelector(state),
    updateSortedOfficerIds: ownProps.updateSortedOfficerIds,
    requesting: getRequesting(state),
  };
}

const mapDispatchToProps = {
  updateSelectedOfficerId,
  updateTimelineIdx: updateSocialGraphTimelineIdx,
  updateRefreshIntervalId: updateSocialGraphRefreshIntervalId,
  updateSelectedEdge: updateSocialGraphSelectedEdge,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSocialGraphWithSpinner);
