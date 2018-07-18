import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import {
  getOfficerId,
  getOfficerName,
  metricsSelector,
  officerYearlyThreePercentile,
  summarySelector,
  getCurrentTab,
} from 'selectors/officer-page';
import { openPoliceUnitPage } from 'actions/open-page';
import { changeOfficerTab } from 'actions/officer-page';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: getOfficerId(state),
    officerSummary: summarySelector(state),
    officerMetrics: metricsSelector(state),
    threeCornerPercentile: officerYearlyThreePercentile(state),
    currentTab: getCurrentTab(state),
    isRequesting: state.officerPage.isRequesting
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage,
  changeOfficerTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerPage);
