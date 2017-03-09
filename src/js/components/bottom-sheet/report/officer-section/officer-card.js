import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import HoverableButton from 'components/common/hoverable-button';
import {
  wrapperStyle, circleStyle, officerContentWrapperStyle,
  officerNameStyle, officerSubInfoStyle, removeOfficerStyle, indicatorStyle
} from './officer-card.style';


export class OfficerCard extends Component {
  constructor(props) {
    super(props);

    this.getStyle = this.getStyle.bind(this);
  }

  getStyle() {
    const { editModeOn, hovering, style } = this.props;
    const isHoverStyle = !editModeOn && hovering;

    return {
      wrapper: isHoverStyle ? { ...wrapperStyle.hover, ...style }
        : { ...wrapperStyle.base, ...style },
      officerName: isHoverStyle ? officerNameStyle.hover : officerNameStyle.base,
      officerSubInfo: isHoverStyle ? officerSubInfoStyle.hover : officerSubInfoStyle.base,
      indicator: isHoverStyle ? indicatorStyle.hover : indicatorStyle.base
    };
  }

  render() {
    const {
      officerId, fullName, gender, race, allegationCount, onRemoveClick, editModeOn, openBottomSheetWithOfficer
    } = this.props;
    const style = this.getStyle();

    const wrapperProps = {
      style: style.wrapper,
      className: 'test--officer-card'
    };
    if (!editModeOn) {
      wrapperProps.onClick = () => openBottomSheetWithOfficer(officerId);
    }

    const content = [
      <div key='1' style={ circleStyle(allegationCount) }/>,
      <div key='2' style={ officerContentWrapperStyle }>
        <div style={ style.officerName } className='test--officer-name'>{ fullName }</div>
        <div style={ style.officerSubInfo } className='test--officer-sub-info'>{ gender } ({ race })</div>
      </div>,
      editModeOn ?
        <HoverableButton key='3' className='test--remove-officer-button'
          style={ removeOfficerStyle } onClick={ () => onRemoveClick(officerId) } /> :
        <div key='4' className='test--indicator' style={ style.indicator } />
    ];

    return React.cloneElement(<div/>, wrapperProps, content);
  }
}

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  race: PropTypes.string,
  allegationCount: PropTypes.number,
  onRemoveClick: PropTypes.func,
  style: PropTypes.object,
  editModeOn: PropTypes.bool,
  openBottomSheetWithOfficer: PropTypes.func,
  hovering: PropTypes.bool
};

export default Hoverable(OfficerCard);
