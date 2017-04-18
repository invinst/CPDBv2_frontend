import { connect } from 'react-redux';

import TimelineSideBar from 'components/officer-page/timeline-page/sidebar';
import { fetchMinimap, flipSortOrder } from 'actions/officer-page/timeline';
import { sortDescendingSelector, minimapSelector } from 'selectors/officer-page/timeline';


function mapStateToProps(state, ownProps) {
  return {
    sortDescending: sortDescendingSelector(state),
    minimap: minimapSelector(state)
  };
}

const mapDispatchToProps = {
  fetchMinimap,
  flipSortOrder
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineSideBar);

