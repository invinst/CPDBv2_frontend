import { connect } from 'react-redux';
import React from 'react';

import UnitProfilePage from 'components/unit-profile-page';


const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    unitName: ownProps.params.unitName
  };
};

export default connect(mapStateToProps)(UnitProfilePage);
