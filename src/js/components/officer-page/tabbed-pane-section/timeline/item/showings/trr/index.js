import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import baseStyles from '../base-item.sass';
import styles from './trr.sass';


export default class Trr extends Component {
  render() {
    const { item } = this.props;

    return (
      <Link className={ cx(baseStyles.baseItem, styles.trr) } to={ `/trr/${item.trrId}/` }>
        <span className='item-content trr-item-content'>
          <div className='item-wrapper-kind'>
            <span className='item-kind trr-item-kind'>Force</span>
          </div>
          <span className='item-category trr-item-category'>
            { item.category }
          </span>
          <span className='item-date trr-item-date'>{ item.date }</span>
        </span>
      </Link>
    );
  }
}

Trr.propTypes = {
  item: PropTypes.object,
};
