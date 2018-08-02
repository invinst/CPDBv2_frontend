import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';

import OfficerRow from './officer-row';
import { wrapperStyle, lastItemStyle, titleStyle } from './involvement-item.style';
import Popup from 'components/common/popup';
import { POPUP_NAMES } from 'utils/constants';


export default class InvolvementItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { involvedType, officers, style, className, popup } = this.props;
    const involvedTypeMap = {
      investigator: {
        name: 'INVESTIGATOR',
        popupName: POPUP_NAMES.COMPLAINT.INVESTIGATOR,
      },
      'police_witness': {
        name: 'POLICE WITNESSES',
        popupName: POPUP_NAMES.COMPLAINT.POLICE_WITNESS,
      }
    };

    return (
      <div className={ className } style={ { ...wrapperStyle, ...style } }>
        <div style={ titleStyle } className='test--involvement-type'>{ involvedTypeMap[involvedType].name }
          <Popup
            { ...get(popup, involvedTypeMap[involvedType].popupName) }
            position='relative'
          />
        </div>
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
  className: PropTypes.string,
  popup: PropTypes.popup,
};
