import { connect } from 'react-redux';
import React from 'react';

import OfficerPage from 'components/officer-page';
import { fetchOfficerSummary } from 'actions/officer-page';
import { getOfficerName } from 'selectors/officer-page';


function mapStateToProps(state, ownProps) {
  return {
    officerName: getOfficerName(state),
    officerId: parseInt(ownProps.params.officerId)
  };
}

const mapDispatchToProps = {
  fetchOfficerSummary
};

export default connect(mapStateToProps, mapDispatchToProps)(OfficerPage);
