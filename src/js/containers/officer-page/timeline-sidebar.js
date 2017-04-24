import { connect } from 'react-redux';

import TimelineSideBar from 'components/officer-page/timeline-page/sidebar';
import { fetchMinimap, flipSortOrder, selectMinimapItem } from 'actions/officer-page/timeline';
import { getSortDescending, minimapSelector } from 'selectors/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    sortDescending: getSortDescending(state),
    minimap: minimapSelector(state)
  };
}

const mapDispatchToProps = {
  fetchMinimap,
  flipSortOrder,
  selectMinimapItem
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineSideBar);

