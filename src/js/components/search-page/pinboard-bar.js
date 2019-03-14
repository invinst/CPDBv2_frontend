import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import styles from './pinboard-bar.sass';


export default class PinboardBar extends Component {
  render() {
    const { itemsCount } = this.props;

    return (
      <div className={ styles.wrapper }>
        {
          (itemsCount === 0) ?
            'Your pinboard is empty'
            :
            `Your pinboard has ${itemsCount} ${pluralize('item', itemsCount)}`
        }
      </div>
    );
  }
}

PinboardBar.propTypes = {
  itemsCount: PropTypes.number,
};
