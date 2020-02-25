import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './pinboard-row.sass';

export default function PinboardRow(props) {
  const {
    id,
    title,
    createdAt,
    pinnedCount,
    childCount,
    isHeader,
    onClick,
  } = props;

  return (
    <div className={ cx(styles.row, { 'header': isHeader }) } onClick={ onClick }>
      <span className='cell pinboard-id'>{ id }</span>
      <span className='cell pinboard-title'>{ title }</span>
      <span className='cell pinboard-pinned'>{ pinnedCount }</span>
      <span className='cell pinboard-children'>{ childCount }</span>
      <span className='cell pinboard-date'>{ createdAt }</span>
    </div>
  );
}

PinboardRow.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  createdAt: PropTypes.string,
  pinnedCount: PropTypes.string,
  childCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isHeader: PropTypes.bool,
  onClick: PropTypes.func,
};
