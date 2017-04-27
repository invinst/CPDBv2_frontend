import { connect } from 'react-redux';

import Timeline from 'components/officer-page/timeline-page/timeline';
import { fetchTimelineItems, fetchTimelineItemsWhenIndexOutOfBound } from 'actions/officer-page/timeline';
import { openBottomSheetWithComplaint } from 'actions/bottom-sheet';
import {
  timelineItemsHasMoreSelector, timelineItemsSelector, timelineItemsNextParamsSelector, sortParamsSelector,
  getSelectedItemIndex, getHoveredItemIndex
} from 'selectors/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    hasMore: timelineItemsHasMoreSelector(state),
    sortParams: sortParamsSelector(state),
    items: timelineItemsSelector(state),
    nextParams: timelineItemsNextParamsSelector(state),
    selectedItemIndex: getSelectedItemIndex(state),
    officerId: ownProps.officerId,
    hoveredItemIndex: getHoveredItemIndex(state)
  };
}

const mapDispatchToProps = {
  fetchTimelineItems,
  fetchTimelineItemsWhenIndexOutOfBound,
  openBottomSheetWithComplaint
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
