import React, { Component, PropTypes } from 'react';

import { getThisYear } from 'utils/date';
import styles from './year-old.sass';


export default class YearOld extends Component {
  render() {
    const { birthYear } = this.props;

    return (
      <span className={ styles.yearOld }>
        { `${getThisYear() - birthYear} years old` }
      </span>
    );
  }
}

YearOld.propTypes = {
  birthYear: PropTypes.number,
};
