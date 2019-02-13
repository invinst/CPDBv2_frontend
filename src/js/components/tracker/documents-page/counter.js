import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './counter.sass';


export default class Counter extends Component {
  render() {
    const { viewsCount, downloadsCount, className } = this.props;

    return (
      <span className={ cx(styles.wrapper, className) }>
        <span className='view-icon' />
        <span className='view-count'>{ Number(viewsCount).toLocaleString() }</span>
        <span className='download-icon' />
        <span className='download-count'>{ Number(downloadsCount).toLocaleString() }</span>
      </span>
    );
  }
}

Counter.propTypes = {
  viewsCount: PropTypes.number,
  downloadsCount: PropTypes.number,
  className: PropTypes.string
};

