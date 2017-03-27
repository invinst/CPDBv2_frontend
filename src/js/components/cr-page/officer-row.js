import React, { Component, PropTypes } from 'react';

import {
  wrapperStyle, labelStyle, officerNameStyle, extraInfoStyle, viewOfficerButtonWrapperStyle, rightIndicatorStyle
} from './officer-row.style';


export default class OfficerRow extends Component {
  render() {
    const { fullName, gender, race, openBottomSheetWithOfficer, officerId } = this.props;

    return (
      <div style={ wrapperStyle }>
        <span style={ labelStyle }>Officer</span>
        <span style={ officerNameStyle }>{ fullName }</span>
        <span style={ extraInfoStyle }>{ `${gender}, ${race}`.toLowerCase() }</span>
        <div style={ viewOfficerButtonWrapperStyle }
          onClick={ () => openBottomSheetWithOfficer(officerId) }>
          <span>view officer profile</span>
          <div style={ rightIndicatorStyle } />
        </div>
      </div>
    );
  }
}

OfficerRow.propTypes = {
  fullName: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  openBottomSheetWithOfficer: PropTypes.func,
  officerId: PropTypes.number
};
