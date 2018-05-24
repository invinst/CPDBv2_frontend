import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';
import { getNewTimelineItems } from 'selectors/officer-page/new-timeline';
import { changeFilter } from 'actions/officer-page/new-timeline';
import { openComplaintPage } from 'actions/open-page';
import { getOfficerId } from 'selectors/officer-page';

function mapStateToProps(state, ownProps) {
  return {
    items: getNewTimelineItems(state),
    officerId: getOfficerId(state),
  };
}

const mapDispatchToProps = {
  changeFilter,
  openComplaintPage,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
