import { connect } from 'react-redux';
import React from 'react';

import PrintNotes from 'components/common/print-notes';


function mapStateToProps(state, ownProps) {
  return {
    notes: state.popups,
  };
}

export default connect(mapStateToProps)(PrintNotes);
