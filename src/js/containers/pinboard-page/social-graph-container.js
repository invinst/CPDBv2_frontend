import { connect } from 'react-redux';

import {
  graphDataSelector,
  getPinboardTimelineIdx,
  getPinboardRefreshIntervalId,
  getSocialGraphRequesting,
} from 'selectors/pinboard-page/social-graph';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import { updatePinboardTimelineIdx, updatePinboardRefreshIntervalId } from 'actions/pinboard-page';


function mapStateToProps(state, ownProps) {
  return {
    officers: graphDataSelector(state).officers,
    coaccusedData: graphDataSelector(state).coaccusedData,
    listEvent: graphDataSelector(state).listEvent,
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
