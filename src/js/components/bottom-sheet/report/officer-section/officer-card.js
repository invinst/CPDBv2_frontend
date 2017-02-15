import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import HoverableButton from 'components/common/hoverable-button';
import {
  wrapperStyle, circleStyle, officerContentWrapperStyle, rightIconStyle,
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
    const { officerId, fullName, gender, race, allegationCount, v1Url, onRemoveClick, editModeOn } = this.props;
    const style = this.getStyle();

    return (
      <div href={ editModeOn ? null : v1Url } style={ style.wrapper }>
        <div style={ circleStyle(allegationCount) }/>
        <div style={ officerContentWrapperStyle }>
          <div style={ style.officerName }>{ fullName }</div>
          <div style={ style.officerSubInfo }>{ gender } ({ race })</div>
        </div>
        <div style={ rightIconStyle }>
        {
          editModeOn ?
            <HoverableButton className='test--remove-officer-button'
              style={ removeOfficerStyle } onClick={ () => onRemoveClick(officerId) } />
            : <div style={ style.indicator } />
        }
        </div>
      </div>
    );
  }
}

OfficerCard.propTypes = {
  officerId: PropTypes.number,
  fullName: PropTypes.string,
  v1Url: PropTypes.string,
  gender: PropTypes.string,
  race: PropTypes.string,
  allegationCount: PropTypes.number,
  onRemoveClick: PropTypes.func,
  style: PropTypes.object,
  editModeOn: PropTypes.bool,
  hovering: PropTypes.bool
};

export default Hoverable(OfficerCard);
