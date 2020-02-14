import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './row.sass';
import LoadingSpinner from 'components/common/loading-spinner';


export default function Row(props) {
  const { text, number, className, loading } = props;
  return (
    <div className={ styles.row }>
      <span className={ cx('legend-row-oval', className) } />
      <span className='legend-row-text'>{ text }</span>
      <span className='legend-row-number'>{ number }</span>
      { loading && <LoadingSpinner className='row-spinner' /> }
    </div>
  );
}

Row.propTypes = {
  text: PropTypes.string,
  number: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.bool,
};
