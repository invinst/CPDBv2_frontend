import { connect } from 'react-redux';
import React from 'react';

import SummaryPage from 'components/officer-page/summary-page';
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

export default connect(mapStateToProps, null)(SummaryPage);
