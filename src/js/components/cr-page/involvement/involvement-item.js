import React, { Component, PropTypes } from 'react';
import { map } from 'lodash';
import cx from 'classnames';

import OfficerRow from './officer-row';
import styles from './involvement-item.sass';


export default class InvolvementItem extends Component {
  render() {
    const { involvedType, officers, className } = this.props;
    const INVOLVEMENT_NUM_OF_COLUMNS = 4;
    const involvedTypeMap = {
      investigator: {
        name: 'INVESTIGATOR',
      },
      'police_witness': {
        name: 'POLICE WITNESSES',
      }
    };

    return (
      <div className={ cx(styles.involvementItem, className) }>
        <div className='involvement-type'>{ involvedTypeMap[involvedType].name }</div>
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
};
