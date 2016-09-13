import { connect } from 'react-redux';
import React from 'react';

import {
  storiesSelector, dataAvailableSelector
} from 'selectors/landing-page/stories-selector';
import { openBottomSheetWithStory } from 'actions/landing-page/bottom-sheet';
import ReportingSection from 'components/landing-page/reporting-section';


function mapStateToProps(state, ownProps) {
  return {
    dataAvailable: dataAvailableSelector(state),
    stories: storiesSelector(state)
  };
}

const mapDispatchToProps = {
  openBottomSheetWithStory
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportingSection);
