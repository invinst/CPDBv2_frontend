import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import LabeledIcon from 'components/common/labeled-icon';
import {
  wrapperStyle, officerInfoStyle, viewingStyle, arrowStyle,
  viewStyle
} from './coaccused-list-item.style';


export class CoaccusedListItem extends Component {
  render() {
    const {
      viewing, hovering, fullName, openBottomSheetWithComplaint, crid, id, showBottomBorder, badge
    } = this.props;

    let viewingText = null;
    if (viewing) {
      viewingText = <span style={ viewingStyle }>Viewing</span>;
    } else {
      viewingText = (
        <div style={ viewingStyle }>
          <span style={ viewStyle(hovering) }>View</span> <span style={ arrowStyle(hovering) } />
        </div>
      );
    }

    return (
      <div className='test--coaccused-list-item'
        style={ wrapperStyle(viewing, hovering, showBottomBorder) }
        onClick={ viewing ? null : () => openBottomSheetWithComplaint({ crid, officerId: id }) }>
        <div style={ officerInfoStyle }>
          <LabeledIcon label={ fullName } sublabel={ 'Badge ' + badge }/>
        </div>
        { viewingText }
      </div>
    );
  }
}

CoaccusedListItem.propTypes = {
  viewing: PropTypes.bool,
  id: PropTypes.number,
  crid: PropTypes.string,
  openBottomSheetWithComplaint: PropTypes.func,
  fullName: PropTypes.string,
  gender: PropTypes.string,
  race: PropTypes.string,
  badge: PropTypes.string,
  hovering: PropTypes.bool,
  showBottomBorder: PropTypes.bool
};

export default Hoverable(CoaccusedListItem);
