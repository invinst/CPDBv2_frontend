import React, { Component, PropTypes } from 'react';

import styles from './month-separator.sass';

export default class MonthSeparator extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className={ styles.wrapper }>
        { text }
      </div>
    );
  }
}

MonthSeparator.propTypes = {
  text: PropTypes.string,
};
