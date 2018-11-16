import { connect } from 'react-redux';
import React from 'react';

import Notes from 'components/common/notes';


function mapStateToProps(state, ownProps) {
  return {
    notes: state.popups,
  };
}

export default connect(mapStateToProps)(Notes);
