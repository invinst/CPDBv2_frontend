import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';
import cx from 'classnames';

import OfficerRow from './officer-row';
import Popup from 'components/common/popup';
import { POPUP_NAMES } from 'utils/constants';
import styles from './involvement-item.sass';


export default class InvolvementItem extends Component {
  render() {
    const { involvedType, officers, className, popup, pathName } = this.props;
    const INVOLVEMENT_NUM_OF_COLUMNS = 4;
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
      <div className={ cx(styles.involvementItem, className) }>
        <div className='involvement-type'>{ involvedTypeMap[involvedType].name }
          <Popup
            { ...get(popup, involvedTypeMap[involvedType].popupName) }
            position='relative'
            url={ pathName }
          />
        </div>
        <div className={ cx({ 'columns-layout': officers.length > INVOLVEMENT_NUM_OF_COLUMNS }) }>
          {
            map(officers, (officer, index) =>
            {
              return (
                <OfficerRow key={ index } { ...officer } />
              );
            })
          }
        </div>
        <div className='clearfix'/>
      </div>
    );
  }
}

InvolvementItem.defaultProps = {
  officers: [],
};

InvolvementItem.propTypes = {
  involvedType: PropTypes.string,
  officers: PropTypes.array,
  style: PropTypes.object,
  className: PropTypes.string,
  popup: PropTypes.object,
  pathName: PropTypes.string,
};
