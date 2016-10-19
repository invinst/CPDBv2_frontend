import { connect } from 'react-redux';
import React from 'react';

import {
  storiesSelector, dataAvailableSelector
} from 'selectors/landing-page/stories-selector';
import { openBottomSheetWithReport } from 'actions/bottom-sheet';
import ReportingSection from 'components/landing-page/reporting-section';
import {
  updateLandingPage, turnOnSectionEditMode, turnOffSectionEditMode, REPORTING
} from 'actions/landing-page';


function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    stories: storiesSelector(state),
    fields: state.landingPage.storyApp.fields,
    sectionEditModeOn: state.landingPage.storyApp.editModeOn
  };
}

const mapDispatchToProps = {
  openBottomSheetWithReport,
  onSaveForm: updateLandingPage,
  turnOnSectionEditMode: turnOnSectionEditMode.bind(null, REPORTING),
  turnOffSectionEditMode: turnOffSectionEditMode.bind(null, REPORTING)
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportingSection);
