import { connect } from 'react-redux';
import React from 'react';

import SummaryPage from 'components/unit-profile-page/summary-page';
import { summarySelector } from 'selectors/unit-profile-page';
import { fetchUnitProfileSummary } from 'actions/unit-profile-page';


const mapStateToProps = (state, ownProps) => {
  const {
    activeMembers, totalMembers, memberFacets, complaintCount, sustainedComplaintCount, complaintFacets
  } = summarySelector(state);

  return {
    unitName: ownProps.unitName,
    activeMembers,
    totalMembers,
    memberFacets,
    complaintCount,
    sustainedComplaintCount,
    complaintFacets
  };
};

const mapDispatchToProps = {
  fetchUnitProfileSummary
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPage);
