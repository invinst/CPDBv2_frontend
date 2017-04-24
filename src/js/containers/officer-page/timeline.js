import { connect } from 'react-redux';

import Timeline from 'components/officer-page/timeline-page/timeline';
import { fetchTimelineItems, fetchTimelineItemsWhenIndexOutOfBound } from 'actions/officer-page/timeline';
import {
  timelineItemsHasMoreSelector, timelineItemsSelector, timelineItemsNextParamsSelector, sortParamsSelector,
  getSelectedItemIndex
} from 'selectors/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    hasMore: timelineItemsHasMoreSelector(state),
    sortParams: sortParamsSelector(state),
    items: timelineItemsSelector(state),
    nextParams: timelineItemsNextParamsSelector(state),
    selectedItemIndex: getSelectedItemIndex(state)
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadMore: (params={}) => dispatch(fetchTimelineItems(ownProps.officerId)(params)),
  loadMoreIfNecessary: (itemsLength, selectedIndex, params={}) => dispatch(
    fetchTimelineItemsWhenIndexOutOfBound(itemsLength, selectedIndex, ownProps.officerId, params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
