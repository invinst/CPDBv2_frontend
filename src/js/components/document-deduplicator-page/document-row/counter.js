import React, { Component, PropTypes } from 'react';

import styles from './counter.sass';


export default class Counter extends Component {
  render() {
    const { viewsCount, downloadsCount } = this.props;

    return (
      <span className={ styles.wrapper }>
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
};

