import React, { PropTypes } from 'react';

import { getThisYear } from 'utils/date';
import styles from './year-old.sass';


export default function YearOld(props) {
  const { birthYear } = props;

  return (
    <span className={ styles.yearOld }>
      { `${getThisYear() - birthYear} years old` }
    </span>
  );
}

YearOld.propTypes = {
  birthYear: PropTypes.number,
};
