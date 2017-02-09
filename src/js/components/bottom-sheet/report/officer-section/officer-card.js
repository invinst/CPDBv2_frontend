import React, { Component, PropTypes } from 'react';

import HoverableButton from 'components/common/hoverable-button';
import {
  wrapperStyle, circleStyle, officerContentWrapperStyle, removeOfficerWrapperStyle,
  officerNameStyle, officerSubInfoStyle, removeOfficerStyle
} from './officer-card.style';


export default class OfficerCard extends Component {
  render() {
    const { officerId, fullName, gender, race, allegationCount, onRemoveClick, style } = this.props;
    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <div style={ circleStyle(allegationCount) }/>
        <div style={ officerContentWrapperStyle }>
          <div style={ officerNameStyle }>{ fullName }</div>
          <div style={ officerSubInfoStyle }>{ gender } ({ race })</div>
        </div>
        <div style={ removeOfficerWrapperStyle }>
          <HoverableButton style={ removeOfficerStyle } onClick={ () => onRemoveClick(officerId) } />
        </div>
      </div>
    );
  }
}

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  race: PropTypes.string,
  allegationCount: PropTypes.number,
  onRemoveClick: PropTypes.func,
  style: PropTypes.object
};
