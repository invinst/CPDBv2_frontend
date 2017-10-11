import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import { getOfficerName } from 'selectors/officer-page';
import { timelineUrlParamsSelector } from 'selectors/officer-page/timeline';

function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: parseInt(ownProps.id),
    location: ownProps.location,
    officerTimelineUrlParams: timelineUrlParamsSelector(state)
  };
}

export default connect(mapStateToProps)(OfficerPage);
