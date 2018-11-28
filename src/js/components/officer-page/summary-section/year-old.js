import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { getThisYear } from 'utils/date';
import styles from './year-old.sass';


export default class YearOld extends Component {
  render() {
    const { birthYear } = this.props;

    return (
      <span className={ cx(styles.yearOld, 'test--year-old') }>
        { `${getThisYear() - birthYear} years old` }
      </span>
    );
  }
}

YearOld.propTypes = {
  birthYear: PropTypes.number,
};
