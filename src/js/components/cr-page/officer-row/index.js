import React, { Component, PropTypes } from 'react';

import ViewProfileButton from './view-profile-button';
import { wrapperStyle, labelStyle, officerNameStyle, extraInfoStyle } from './officer-row.style';


export default class OfficerRow extends Component {
  render() {
    const { fullName, gender, race, openBottomSheetWithOfficer, officerId } = this.props;

    return (
      <div style={ wrapperStyle }>
        <span className='test--row-label' style={ labelStyle }>Officer</span>
        <span className='test--row-content' style={ officerNameStyle }>{ fullName }</span>
        <span className='test--row-extra-info' style={ extraInfoStyle }>{ `${gender}, ${race}`.toLowerCase() }</span>
        <ViewProfileButton officerId={ officerId } onClick={ openBottomSheetWithOfficer } />
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
