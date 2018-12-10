import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './row.sass';


export default class Row extends Component {

  render() {
    const { text, number, className } = this.props;
    return (
      <div className={ styles.row }>
        <span className={ cx('legend-row-oval', className) } />
        <span className='legend-row-text'>{ text }</span>
        <span className='legend-row-number'>{ number }</span>
      </div>
    );
  }
}

Row.propTypes = {
  text: PropTypes.string,
  number: PropTypes.number,
  className: PropTypes.string,
};
