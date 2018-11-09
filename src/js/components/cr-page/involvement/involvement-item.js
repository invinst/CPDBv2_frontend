import React, { Component, PropTypes } from 'react';
import { map, get } from 'lodash';
import cx from 'classnames';

import OfficerRow from './officer-row';
import Popup from 'components/common/popup';
import { POPUP_NAMES } from 'utils/constants';
import styles from './involvement-item.sass';


export default class InvolvementItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { involvedType, officers, className, popup, pathName } = this.props;
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
        <div>
          {
            map(officers, (officer, index) =>
            {
              return (
                <OfficerRow key={ index } { ...officer } />
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
  popup: PropTypes.object,
  pathName: PropTypes.string,
};
