import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import { getActiveTab, getOfficerName, getPathname } from 'selectors/officer-page';
import { getShareablePageScrollPosition } from 'selectors/headers/shareable-header';
import { openPoliceUnitPage } from 'actions/bottom-sheet';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    pathname: getPathname(state),
    activeTab: getActiveTab(state),
    scrollPosition: getShareablePageScrollPosition(state),
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerPage);
