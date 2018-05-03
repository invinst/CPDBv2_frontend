import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';

import OfficerRow from './officer-row';
import { wrapperStyle, lastItemStyle, titleStyle } from './involvement-item.style';


export default class InvolvementItem extends Component {
  render() {
    const { involvedType, officers, style, className } = this.props;
    const involvedTypeMap = {
      investigator: 'INVESTIGATOR',
      'police_witness': 'POLICE WITNESSES'
    };

    return (
      <div className={ className } style={ { ...wrapperStyle, ...style } }>
        <div style={ titleStyle } className='test--involvement-type'>{ involvedTypeMap[involvedType] }</div>
        <div>
          {
            map(officers, (officer, index) =>
            {
              return (
                <OfficerRow
                  style={ index === officers.length - 1 ? lastItemStyle : {} }
                  key={ index } { ...officer } />
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
  className: PropTypes.string
};
