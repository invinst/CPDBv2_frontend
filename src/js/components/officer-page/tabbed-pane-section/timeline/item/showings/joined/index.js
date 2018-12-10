import React, { PropTypes, Component } from 'react';
import cx from 'classnames';

import baseStyles from '../base-item.sass';
import styles from './joined.sass';


export default class Joined extends Component {

  render() {
    const { item } = this.props;

    const unitString = item.unitName === 'Unassigned' ? '' : ` with ${item.unitName}`;
    const rankString = item.rank === 'Unknown' ? '' : ` as a ${item.rank}`;

    return (
      <span className={ cx(baseStyles.baseItem, styles.joined) }>
        <span className='item-content joined-item-content'>
          <span className='joined-item-join'>
            Joined Chicago Police Department{ unitString }{ rankString }
          </span>
          <span className='item-date joined-item-date'>{ item.date }</span>
        </span>
      </span>
    );
  }
}

Joined.propTypes = {
  item: PropTypes.object,
};
