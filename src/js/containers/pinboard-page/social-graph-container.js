import { connect } from 'react-redux';

import {
  currentGraphDataSelector,
  getPinboardTimelineIdx,
  getPinboardRefreshIntervalId,
  getSocialGraphRequesting,
} from 'selectors/pinboard-page/social-graph';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import { updatePinboardTimelineIdx, updatePinboardRefreshIntervalId } from 'actions/pinboard-page';


function mapStateToProps(state, ownProps) {
  const data = currentGraphDataSelector(state);

  return {
    showGraphControlPanel: false,
    officers: data.officers,
    coaccusedData: data.coaccusedData,
    listEvent: data.listEvent,
    hasIntercom: true,
    timelineIdx: getPinboardTimelineIdx(state),
    refreshIntervalId: getPinboardRefreshIntervalId(state),
    requesting: getSocialGraphRequesting(state),
  };
}

const mapDispatchToProps = {
  updateTimelineIdx: updatePinboardTimelineIdx,
  updateRefreshIntervalId: updatePinboardRefreshIntervalId,
};


export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSocialGraphWithSpinner);
