import { connect } from 'react-redux';

import {
  graphDataSelector,
  getPinboardTimelineIdx,
  getPinboardRefreshIntervalId,
  getExpandedLink,
  getRequesting,
} from 'selectors/pinboard-page/social-graph';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import { updatePinboardTimelineIdx, updatePinboardRefreshIntervalId } from 'actions/pinboard-page';


function mapStateToProps(state, ownProps) {
  return {
    requesting: getRequesting(state),
    officers: graphDataSelector(state).officers,
    coaccusedData: graphDataSelector(state).coaccusedData,
    listEvent: graphDataSelector(state).listEvent,
    hasIntercom: true,
    timelineIdx: getPinboardTimelineIdx(state),
    refreshIntervalId: getPinboardRefreshIntervalId(state),
    expandedLink: getExpandedLink(state.pathname),
  };
}

const mapDispatchToProps = {
  updateTimelineIdx: updatePinboardTimelineIdx,
  updateRefreshIntervalId: updatePinboardRefreshIntervalId,
};


export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSocialGraphWithSpinner);
