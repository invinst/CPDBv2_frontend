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
import { hasComplaintSelector } from 'selectors/officer-page/attachments';
import { hasMapMarkersSelector } from 'selectors/officer-page/map';
import { hasCoaccusalSelector } from 'selectors/officer-page/coaccusals';
import { popupSelector } from 'selectors/popup';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: getOfficerId(state),
    officerSummary: summarySelector(state),
    officerMetrics: metricsSelector(state),
    threeCornerPercentile: officerYearlyThreePercentile(state),
    currentTab: getCurrentTab(state),
    hasComplaint: hasComplaintSelector(state),
    hasMapMarker: hasMapMarkersSelector(state),
    hasCoaccusal: hasCoaccusalSelector(state),
    popup: popupSelector(state),
    isRequesting: state.officerPage.isRequesting
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage,
  changeOfficerTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerPage);
