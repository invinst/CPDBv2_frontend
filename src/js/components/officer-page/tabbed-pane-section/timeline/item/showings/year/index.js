import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import baseStyles from '../base-item.sass';
import styles from './year.sass';


export default class Year extends Component {
  render() {
    const { date, hasData } = this.props.item;

    return (
      <span className={ cx(baseStyles.baseItem, styles.year, { 'has-data': hasData }) }>
        <div className='item-content year-item-item-content'>
          <span className='item-date year-item-date'>{ date }</span>
          <br className='year-clear-float' />
        </div>
      </span>
    );
  }
}

Year.propTypes = {
  item: PropTypes.shape({
    date: PropTypes.string,
    hasData: PropTypes.bool,
  }),
};
