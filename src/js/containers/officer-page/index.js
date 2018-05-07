import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import {
  getOfficerId,
  getOfficerName,
  metricsSelector,
  officerYearlyThreePercentile,
  summarySelector
} from 'selectors/officer-page';
import { openPoliceUnitPage } from 'actions/bottom-sheet';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: getOfficerId(state),
    officerSummary: summarySelector(state),
    officerMetrics: metricsSelector(state),
    threeCornerPercentile: officerYearlyThreePercentile(state),
  };
}

const mapDispatchToProps = {
  openPoliceUnitPage
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerPage);
