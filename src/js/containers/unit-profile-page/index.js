import { connect } from 'react-redux';
import React from 'react';

import UnitProfilePage from 'components/unit-profile-page';
import { summarySelector } from 'selectors/unit-profile-page';
import { fetchUnitProfileSummary } from 'actions/unit-profile-page';
import { getShareablePageScrollPosition } from 'selectors/headers/shareable-header';


export const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    unitName: ownProps.params.unitName,
    summary: summarySelector(state),
    scrollPosition: getShareablePageScrollPosition(state),
  };
};

const mapDispatchToProps = {
  fetchUnitProfileSummary
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitProfilePage);
