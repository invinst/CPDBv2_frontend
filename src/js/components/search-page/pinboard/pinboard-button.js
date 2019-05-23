import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './pinboard-button.sass';


export default class PinboardButton extends Component {
  render() {
    const { pinboard, emptyText } = this.props;

    if (!pinboard.isPinboardRestored) {
      return null;
    }

    if (pinboard.itemsCount === 0 && emptyText) {
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
        { `Pinboard (${pinboard.itemsCount})` }
      </Link>
    );
  }
}

PinboardButton.propTypes = {
  pinboard: PropTypes.object,
  emptyText: PropTypes.bool,
};

PinboardButton.defaultProps = {
  pinboard: {},
  emptyText: false,
};
