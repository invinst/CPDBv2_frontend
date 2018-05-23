import { connect } from 'react-redux';
import React from 'react';

import { fetchTRR } from 'actions/trr-page';
import { getTRRId, officerSelector } from 'selectors/trr-page';
import TRRPage from 'components/trr-page';


function mapStateToProps(state) {
  return {
    trrId: getTRRId(state),
    officer: officerSelector(state),
  };
}

const mapDispatchToProps = {
  fetchTRR,
};

export default connect(mapStateToProps, mapDispatchToProps)(TRRPage);
