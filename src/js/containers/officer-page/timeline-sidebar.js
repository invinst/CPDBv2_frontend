import { connect } from 'react-redux';

import TimelineSideBar from 'components/officer-page/timeline-page/sidebar';
import { flipSortOrder, selectMinimapItem, hoverMinimapItem } from 'actions/officer-page/timeline';
import {
  getSortDescending, minimapSelector, getHoveredItemIndex, getSelectedItemIndex, getTimelineFilters
} from 'selectors/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    sortDescending: getSortDescending(state),
    minimap: minimapSelector(state),
    filters: getTimelineFilters(state),
    hoveredItemIndex: getHoveredItemIndex(state),
    selectedItemIndex: getSelectedItemIndex(state),
    pathname: window.location.pathname,
  };
}

const mapDispatchToProps = {
  flipSortOrder,
  selectMinimapItem,
  hoverMinimapItem
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineSideBar);

