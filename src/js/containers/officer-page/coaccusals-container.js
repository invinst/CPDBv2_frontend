import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import React from 'react';

import Coaccusals from 'components/officer-page/summary-page/tabbed-pane-section/coaccusals';
import { getCoaccusalsGroups } from 'selectors/officer-page/coaccusals';


function mapStateToProps(state, ownProps) {
  return {
    coaccusalsGroups: getCoaccusalsGroups(state)
  };
}

const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coaccusals));
