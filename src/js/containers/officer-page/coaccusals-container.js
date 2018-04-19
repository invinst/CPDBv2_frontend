import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import Coaccusals from 'components/officer-page/summary-page/tabbed-pane-section/coaccusals';
import { getCoaccusalGroups } from 'selectors/officer-page/coaccusals';
import { openOfficerPage } from 'actions/bottom-sheet';


function mapStateToProps(state, ownProps) {
  return {
    coaccusalGroups: getCoaccusalGroups(state)
  };
}

const mapDispatchToProps = {
  openOfficerPage
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coaccusals));
