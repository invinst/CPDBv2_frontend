import React, { Component, PropTypes } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import {
  wrapperStyle, officerInfoStyle, fullNameStyle, extraInfoStyle, categoryStyle, viewingStyle, indicatorStyle
} from './coaccused-list-item.style';


class CoaccusedListItem extends Component {
  render() {
    const {
      viewing, hovering, fullName, gender, race, category, openBottomSheetWithComplaint, crid, id
    } = this.props;

    return (
      <div style={ wrapperStyle(viewing, hovering) }
        onClick={ viewing ? null : () => openBottomSheetWithComplaint({ crid, officerId: id }) }>
        <div style={ officerInfoStyle }>
          <span style={ fullNameStyle(viewing, hovering) }>{ fullName }</span>
          <span style={ extraInfoStyle(viewing, hovering) }>{ `${gender}, ${race}`.toLowerCase() }</span>
        </div>
        <span style={ categoryStyle(viewing, hovering) }>{ category }</span>
        {
          viewing ? <span style={ viewingStyle }>VIEWING</span> : <div style={ indicatorStyle } />
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
  hovering: PropTypes.bool
};

export default Hoverable(CoaccusedListItem);
