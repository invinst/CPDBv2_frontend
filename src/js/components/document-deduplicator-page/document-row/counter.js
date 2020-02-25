import PropTypes from 'prop-types';
import React from 'react';

import styles from './counter.sass';


export default function Counter(props) {
  const { viewsCount, downloadsCount } = props;

  return (
    <span className={ styles.wrapper }>
      <span className='view-icon' />
      <span className='view-count'>{ Number(viewsCount).toLocaleString() }</span>
      <span className='download-icon' />
      <span className='download-count'>{ Number(downloadsCount).toLocaleString() }</span>
    </span>
  );
}

Counter.propTypes = {
  viewsCount: PropTypes.number,
  downloadsCount: PropTypes.number,
};

