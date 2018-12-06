import React, { Component } from 'react';
import cx from 'classnames';

import baseStyles from '../base-item.sass';
import styles from './empty.sass';


export default class Empty extends Component {

  render() {
    return (
      <span className={ cx(baseStyles.baseItem, styles.empty) }>
        <div className='item-content empty-showing'/>
      </span>
    );
  }
}
