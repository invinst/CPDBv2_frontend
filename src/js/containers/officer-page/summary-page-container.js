import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import SummaryPage from 'components/officer-page/summary-page';
import {
  getOfficerName,
  metricsSelector,
  summarySelector
} from 'selectors/officer-page';
import { openPoliceUnitPage } from 'actions/bottom-sheet';
import { getNewTimelineItems } from 'selectors/officer-page/new-timeline';
import { getOfficerId, officerYearlyThreePercentile } from 'selectors/officer-page';
import { fetchPercentile } from 'actions/officer-page/radar-chart';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerSummary: summarySelector(state),
    officerMetrics: metricsSelector(state),
    newTimelineItems: getNewTimelineItems(state),
    officerId: getOfficerId(state),
    threeCornerPercentile: officerYearlyThreePercentile(state)
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage,
  fetchPercentile
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryPage));
