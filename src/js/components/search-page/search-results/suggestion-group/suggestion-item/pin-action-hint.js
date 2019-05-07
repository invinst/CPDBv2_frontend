import React, { Component, PropTypes } from 'react';

import cx from 'classnames';
import styles from './pin-action-hint.sass';


class PinActionHint extends Component {
  render() {
    const { isPinned, isPinButtonHovered, className } = this.props;

    if (isPinned && isPinButtonHovered) {
      return (
        <p className={ cx(styles.pinActionHintText, className) }>Unpin?</p>
      );
    }

    if (isPinned) {
      return (
        <div className={ cx(styles.icPinnedItem, className) } />
      );
    }

    return null;
  }
}

PinActionHint.propTypes = {
  isPinned: PropTypes.bool,
  isFocused: PropTypes.bool,
  isPinButtonHovered: PropTypes.bool,
  className: PropTypes.string,
};

export default PinActionHint;
