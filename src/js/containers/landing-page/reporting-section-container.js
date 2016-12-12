import { connect } from 'react-redux';
import React from 'react';

import {
  reportGroupsSelector, dataAvailableSelector
} from 'selectors/landing-page/reports-selector';
import { openBottomSheetWithReport } from 'actions/bottom-sheet';
import ReportingSection from 'components/landing-page/reporting-section';
import {
  updateLandingPage, turnOnSectionEditMode, turnOffSectionEditMode, REPORTING
} from 'actions/landing-page';


function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    reportGroups: reportGroupsSelector(state),
    fields: state.landingPage.reportSection.fields,
    sectionEditModeOn: state.landingPage.reportSection.editModeOn
  };
}

const mapDispatchToProps = {
  openBottomSheetWithReport,
  onSaveForm: updateLandingPage,
  turnOnSectionEditMode: turnOnSectionEditMode.bind(null, REPORTING),
  turnOffSectionEditMode: turnOffSectionEditMode.bind(null, REPORTING)
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportingSection);
