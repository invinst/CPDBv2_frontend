import React, { Component, PropTypes } from 'react';

import LabeledIcon from 'components/common/labeled-icon';
import ViewProfileButton from './view-profile-button';
import { wrapperStyle, labelStyle, } from './officer-row.style';


export default class OfficerRow extends Component {
  render() {
    const { fullName, openBottomSheetWithOfficer, officerId, badge } = this.props;

    return (
      <div style={ wrapperStyle }>
        <span className='test--row-label' style={ labelStyle }>ACCUSED OFFICER</span>
        <LabeledIcon label={ fullName } sublabel={ `Badge ${badge}` } />
        <ViewProfileButton officerId={ officerId } onClick={ openBottomSheetWithOfficer } />
      </div>
    );
  }
}

OfficerRow.propTypes = {
  fullName: PropTypes.string,
  badge: PropTypes.string,
  openBottomSheetWithOfficer: PropTypes.func,
  officerId: PropTypes.number
};
