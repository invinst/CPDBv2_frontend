import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import {
  getOfficerName,
  getActiveTab,
  getPathname,
  getOfficerId
} from 'selectors/officer-page';
import { timelineUrlParamsSelector } from 'selectors/officer-page/timeline';

export function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: getOfficerId(state),
    pathname: getPathname(state),
    query: ownProps.location.query,
    officerTimelineUrlParams: timelineUrlParamsSelector(state),
    activeTab: getActiveTab(state)
  };
}

export default connect(mapStateToProps)(OfficerPage);
