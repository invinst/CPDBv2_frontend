import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { wrapperStyle, headerStyle, lastItemStyle } from './involvement-item.style';
import OfficerRow from './officer-row';


export default class InvolvementItem extends Component {
  render() {
    const { involvedType, officers, openBottomSheetWithOfficer, style } = this.props;

    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <div style={ headerStyle }>{ involvedType }</div>
        <div>
          {
            map(officers, ({ id, abbrName, extraInfo }, index) => (
              <OfficerRow style={ index === officers.length - 1 ? lastItemStyle : {} }
                onClick={ openBottomSheetWithOfficer }
                key={ id } officerId={ id } abbrName={ abbrName } extraInfo={ extraInfo } />
            ))
          }
        </div>
      </div>
    );
  }
}


InvolvementItem.propTypes = {
  involvedType: PropTypes.string,
  officers: PropTypes.array,
  style: PropTypes.object,
  openBottomSheetWithOfficer: PropTypes.func
};
