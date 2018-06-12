import { connect } from 'react-redux';
import React from 'react';

import { getTRRId, officerSelector } from 'selectors/trr-page';
import TRRPage from 'components/trr-page';


function mapStateToProps(state) {
  return {
    trrId: getTRRId(state),
    officer: officerSelector(state),
  };
}

export default connect(mapStateToProps, {})(TRRPage);
