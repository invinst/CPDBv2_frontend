import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { newTimelineItemsSelector, filterCountSelector, getSelectedFilter } from 'selectors/officer-page/new-timeline';
import { changeFilter } from 'actions/officer-page/new-timeline';
import { trackingClickAttachment } from 'actions/common/analytic';
import { getOfficerId } from 'selectors/officer-page';
import { changeOfficerTab } from 'actions/officer-page';
import { popupSelector } from 'selectors/popup';
import { getPathname } from 'selectors/common/pathname';

function mapStateToProps(state, ownProps) {
  return {
    items: newTimelineItemsSelector(state),
    officerId: getOfficerId(state),
    popup: popupSelector(state),
    filterCount: filterCountSelector(state),
    pathname: getPathname(state),
    selectedFilter: getSelectedFilter(state),
  };
}

const mapDispatchToProps = {
  changeFilter,
  changeOfficerTab,
  onTrackingAttachment: trackingClickAttachment,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
