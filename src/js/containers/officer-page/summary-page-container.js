import { connect } from 'react-redux';
import React from 'react';

import SummaryPage from 'components/officer-page/summary-page';
import { summarySelector, getComplaintsCount, getComplaintFacets } from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  return {
    officerSummary: summarySelector(state),
    complaintsCount: getComplaintsCount(state),
    complaintFacets: getComplaintFacets(state),
    offficerId: ownProps.offficerId
  };
}

export default connect(mapStateToProps, null)(SummaryPage);
