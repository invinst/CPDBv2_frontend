import React, { PropTypes } from 'react';

import styles from './month-separator.sass';

export default function MonthSeparator(props) {
  const { text } = props;
  return (
    <div className={ styles.wrapper }>
      { text }
    </div>
  );
}

MonthSeparator.propTypes = {
  text: PropTypes.string,
};
