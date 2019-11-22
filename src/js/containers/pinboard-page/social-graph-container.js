import { connect } from 'react-redux';

import {
  currentGraphDataSelector,
  getPinboardTimelineIdx,
  getPinboardRefreshIntervalId,
  getExpandedLink,
} from 'selectors/pinboard-page/social-graph';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import { updatePinboardTimelineIdx, updatePinboardRefreshIntervalId } from 'actions/pinboard-page';


function mapStateToProps(state, ownProps) {
  const data = currentGraphDataSelector(state);

  return {
    officers: data.officers,
    coaccusedData: data.coaccusedData,
    listEvent: data.listEvent,
    hasIntercom: true,
    timelineIdx: getPinboardTimelineIdx(state),
    refreshIntervalId: getPinboardRefreshIntervalId(state),
    expandedLink: getExpandedLink(state.pathname),
    isVisible: ownProps.isVisible,
  };
}

const mapDispatchToProps = {
  updateTimelineIdx: updatePinboardTimelineIdx,
  updateRefreshIntervalId: updatePinboardRefreshIntervalId,
};


export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSocialGraph);
