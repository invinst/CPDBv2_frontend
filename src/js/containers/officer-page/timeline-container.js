import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import TimeLine from 'components/officer-page/summary-page/tabbed-pane-section/timeline';
import { getNewTimelineItems } from 'selectors/officer-page/new-timeline';
import { changeFilter } from 'actions/officer-page/new-timeline';


function mapStateToProps(state, ownProps) {
  return {
    items: getNewTimelineItems(state),
  };
}

const mapDispatchToProps = {
  changeFilter,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TimeLine));
