import { connect } from 'react-redux';

import Timeline from 'components/officer-page/timeline-page/timeline';
import { fetchTimelineItems } from 'actions/officer-page/timeline';
import {
  timelineItemsHasMoreSelector, timelineItemsSelector, timelineItemsNextParamsSelector
} from 'selectors/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    hasMore: timelineItemsHasMoreSelector(state),
    items: timelineItemsSelector(state),
    nextParams: timelineItemsNextParamsSelector(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadMore: (params={}) => dispatch(fetchTimelineItems(ownProps.officerId)(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
