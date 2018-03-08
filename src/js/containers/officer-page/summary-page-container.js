import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import SummaryPage from 'components/officer-page/summary-page';
import {
  complaintsByYearSelector,
  getComplaintFacetsSelector,
  getComplaintsCount,
  getOfficerName,
  getSustainedCount,
  metricsSelector,
  summarySelector
} from 'selectors/officer-page';
import { openPoliceUnitPage } from 'actions/bottom-sheet';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerSummary: summarySelector(state),
    complaintsCount: getComplaintsCount(state),
    sustainedCount: getSustainedCount(state),
    complaintsByYear: complaintsByYearSelector(state),
    complaintFacets: getComplaintFacetsSelector(state),
    officerMetrics: metricsSelector(state),
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SummaryPage));
