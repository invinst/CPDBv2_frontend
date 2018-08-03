import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { newTimelineItemsSelector, filterCount } from 'selectors/officer-page/new-timeline';
import { changeFilter } from 'actions/officer-page/new-timeline';
import { openComplaintPage } from 'actions/open-page';
import { getOfficerId } from 'selectors/officer-page';
import { changeOfficerTab } from 'actions/officer-page';
import { popupSelector } from 'selectors/popup';


function mapStateToProps(state, ownProps) {
  return {
    items: newTimelineItemsSelector(state),
    officerId: getOfficerId(state),
    popup: popupSelector(state),
    filterCount: filterCount(state),
  };
}

const mapDispatchToProps = {
  changeFilter,
  openComplaintPage,
  changeOfficerTab,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
