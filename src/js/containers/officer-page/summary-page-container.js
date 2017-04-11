import { connect } from 'react-redux';
import React from 'react';

import SummaryPage from 'components/officer-page/summary-page';
import { fetchOfficerSummary } from 'actions/officer-page';
import {
  summarySelector, getComplaintsCount, getSustainedCount, getComplaintFacetsSelector
} from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  return {
    officerSummary: summarySelector(state),
    complaintsCount: getComplaintsCount(state),
    sustainedCount: getSustainedCount(state),
    complaintFacets: getComplaintFacetsSelector(state),
    offficerId: ownProps.offficerId
  };
}

const mapDispatchToProps = {
  fetchOfficerSummary
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
