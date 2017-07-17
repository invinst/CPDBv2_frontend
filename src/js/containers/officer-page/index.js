import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import { getOfficerName } from 'selectors/officer-page';

function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: parseInt(ownProps.id),
    location: ownProps.location
  };
}

export default connect(mapStateToProps)(OfficerPage);
