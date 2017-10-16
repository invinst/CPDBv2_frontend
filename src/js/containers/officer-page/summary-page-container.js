import { connect } from 'react-redux';
import React from 'react';

import SummaryPage from 'components/officer-page/summary-page';
import {
  summarySelector, getComplaintsCount, getSustainedCount, getComplaintFacetsSelector
} from 'selectors/officer-page';
import { openPoliceUnitPage } from 'actions/bottom-sheet';


function mapStateToProps(state, ownProps) {
  return {
    officerSummary: summarySelector(state),
    complaintsCount: getComplaintsCount(state),
    sustainedCount: getSustainedCount(state),
    complaintFacets: getComplaintFacetsSelector(state)
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
