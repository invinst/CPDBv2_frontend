import { connect } from 'react-redux';

import Timeline from 'components/officer-page/timeline-page/timeline';
import {
  fetchTimelineItems,
  fetchTimelineFirstItems,
  fetchTimelineItemsWhenIndexOutOfBound,
  hoverTimelineItem,
  selectTimelineItem,
  changeTimelineFilters
} from 'actions/officer-page/timeline';
import { fetchMinimap } from 'actions/officer-page/timeline-minimap';
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
    hoveredItemIndex: getHoveredItemIndex(state),
    filters: state.officerPage.timeline.filters
  };
}

const mapDispatchToProps = {
  fetchTimelineItems,
  fetchTimelineFullItems: fetchTimelineFirstItems,
  fetchTimelineItemsWhenIndexOutOfBound,
  openComplaintPage,
  hoverTimelineItem,
  selectTimelineItem,
  changeTimelineFilters,
  fetchMinimap
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
