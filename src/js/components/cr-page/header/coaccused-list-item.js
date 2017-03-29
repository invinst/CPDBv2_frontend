import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  wrapperStyle, officerInfoStyle, fullNameStyle, extraInfoStyle, categoryStyle, viewingStyle, arrowStyle
} from './coaccused-list-item.style';


class CoaccusedListItem extends Component {
  render() {
    const {
      viewing, hovering, fullName, gender, race, category, openBottomSheetWithComplaint, crid, id, showBottomBorder
    } = this.props;

    return (
      <div className='test--coaccused-list-item'
        style={ wrapperStyle(viewing, hovering, showBottomBorder) }
        onClick={ viewing ? null : () => openBottomSheetWithComplaint({ crid, officerId: id }) }>
        <div style={ officerInfoStyle }>
          <span className='test--coaccused-fullname' style={ fullNameStyle(viewing, hovering) }>{ fullName }</span>
          <span className='test--coaccused-extra-info'
            style={ extraInfoStyle(viewing, hovering) }>{ `${gender}, ${race}`.toLowerCase() }</span>
        </div>
        <span className='test--coaccused-category' style={ categoryStyle(viewing, hovering) }>{ category }</span>
        {
          viewing ? <span style={ viewingStyle }>VIEWING</span> : <div style={ arrowStyle(hovering) } />
        }
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
  category: PropTypes.string,
  hovering: PropTypes.bool,
  showBottomBorder: PropTypes.bool
};

export default Hoverable(CoaccusedListItem);
