import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import Coaccusals from 'components/officer-page/summary-page/tabbed-pane-section/coaccusals';


function mapStateToProps(state, ownProps) {
  return {
  };
}

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coaccusals));
