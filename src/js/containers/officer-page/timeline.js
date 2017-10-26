import { connect } from 'react-redux';

import Timeline from 'components/officer-page/timeline-page/timeline';
import {
  fetchTimelineItems,
  fetchTimelineItemsWhenIndexOutOfBound,
  hoverTimelineItem,
  selectTimelineItem
} from 'actions/officer-page/timeline';
import { openComplaintPage } from 'actions/bottom-sheet';
import {
  timelineItemsHasMoreSelector,
  timelineItemsSelector,
  timelineItemsNextParamsSelector,
  sortParamsSelector,
  getSelectedItemIndex,
  getHoveredItemIndex
} from 'selectors/officer-page/timeline';
import { getOfficerId } from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  return {
    hasMore: timelineItemsHasMoreSelector(state),
    sortParams: sortParamsSelector(state),
    items: timelineItemsSelector(state),
    nextParams: timelineItemsNextParamsSelector(state),
    selectedItemIndex: getSelectedItemIndex(state),
    officerId: getOfficerId(state),
    hoveredItemIndex: getHoveredItemIndex(state)
  };
}

const mapDispatchToProps = {
  fetchTimelineItems,
  fetchTimelineItemsWhenIndexOutOfBound,
  openComplaintPage,
  hoverTimelineItem,
  selectTimelineItem
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
