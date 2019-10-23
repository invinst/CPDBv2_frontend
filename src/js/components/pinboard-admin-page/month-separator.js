import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './month-separator.sass';

export default class MonthSeparator extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className={ cx(styles.wrapper, 'month-separator') }>
        { text }
      </div>
    );
  }
}

MonthSeparator.propTypes = {
  text: PropTypes.string,
};
