import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './pinboard-button.sass';


export default class PinboardButton extends Component {
  render() {
    const { pinboard } = this.props;

    if (!pinboard.isPinboardRestored) {
      return null;
    }

    if (pinboard.itemsCount === 0) {
      return (
        <span className={ cx('test--pinboard-button', styles.pinboardNoItem) }>
          Your pinboard is empty
        </span>
      );
    }
    return (
      <Link
        className={ cx('test--pinboard-button', styles.pinboardHasItems) }
        to={ pinboard.url }>
        { `(${pinboard.itemsCount}) Pinboard` }
      </Link>
    );
  }
}

PinboardButton.propTypes = {
  pinboard: PropTypes.object,
};

PinboardButton.defaultProps = {
  pinboard: {},
};
