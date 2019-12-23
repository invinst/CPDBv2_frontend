import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';
import { isEmpty, noop } from 'lodash';

import styles from './pinboard-button.sass';


export default class PinboardButton extends Component {
  handleClick = e => {
    e.preventDefault();

    const { pinboard, onEmptyPinboardButtonClick } = this.props;

    if (isEmpty(pinboard.id)) {
      if (pinboard.hasPendingChanges) {
        browserHistory.push('/pinboard/');
      } else {
        onEmptyPinboardButtonClick();
      }
    } else {
      browserHistory.push(pinboard.url);
    }
  };

  render() {
    const { pinboard, emptyText } = this.props;

    if (!pinboard.isPinboardRestored) {
      return null;
    }

    if (pinboard.itemsCount === 0 && emptyText) {
      return (
        <span className={
          cx('pinboard-feature', 'test--pinboard-button', styles.pinboardNoItem) } onClick={ this.handleClick }
        >
          Your pinboard is empty
        </span>
      );
    }

    return (
      <span className={
        cx('pinboard-feature', 'test--pinboard-button', styles.pinboardHasItems) } onClick={ this.handleClick }
      >
        { `Pinboard (${pinboard.itemsCount})` }
      </span>
    );
  }
}

PinboardButton.propTypes = {
  pinboard: PropTypes.object,
  emptyText: PropTypes.bool,
  onEmptyPinboardButtonClick: PropTypes.func,
};

PinboardButton.defaultProps = {
  pinboard: {
    itemsCount: 0,
    url: 0,
    isPinboardRestored: true,
  },
  emptyText: false,
  onEmptyPinboardButtonClick: noop,
};
