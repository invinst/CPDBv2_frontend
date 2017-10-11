import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import { wrapperStyle, lastItemStyle } from './involvement-item.style';
import BlockTitle from 'components/common/block-title';
import OfficerRow from './officer-row';


export default class InvolvementItem extends Component {
  render() {
    const { involvedType, officers, openBottomSheetWithOfficer, style } = this.props;

    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <BlockTitle className='test--involvement-type'>{ involvedType.toUpperCase() }</BlockTitle>
        <div>
          {
            map(officers, ({ id, abbrName, extraInfo, ...officer }, index) =>
            {
              return (
                <OfficerRow style={ index === officers.length - 1 ? lastItemStyle : {} }
                  onClick={ openBottomSheetWithOfficer }
                  key={ id } officerId={ id } abbrName={ abbrName } extraInfo={ extraInfo } />
              );
            })
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
