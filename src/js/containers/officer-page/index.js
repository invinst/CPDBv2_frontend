import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import {
  getOfficerName,
  getActiveTab,
  getPathname,
  getOfficerId
} from 'selectors/officer-page';

function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: getOfficerId(state),
    pathname: getPathname(state),
    activeTab: getActiveTab(state)
  };
}

export default connect(mapStateToProps)(OfficerPage);
