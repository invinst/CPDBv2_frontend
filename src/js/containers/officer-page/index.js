import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import { getActiveTab, getOfficerId, getOfficerName, getPathname, summarySelector } from 'selectors/officer-page';
import { getShareablePageScrollPosition } from 'selectors/headers/shareable-header';
import { openPoliceUnitPage } from 'actions/bottom-sheet';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: getOfficerId(state),
    pathname: getPathname(state),
    activeTab: getActiveTab(state),
    scrollPosition: getShareablePageScrollPosition(state),
    officerSummary: summarySelector(state),
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerPage);
