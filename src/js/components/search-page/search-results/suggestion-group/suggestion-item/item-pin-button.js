import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './item-pin-button.sass';


export default class ItemPinButton extends Component {
  handlePinboardButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const { addOrRemoveItemInPinboard, suggestion } = this.props;
    const { type, id, isPinned } = suggestion;

    addOrRemoveItemInPinboard({
      type: type,
      id: id,
      isPinned: isPinned,
    });
  }

  render() {
    const { className } = this.props;
    const { isPinned } = this.props.suggestion;

    return (
      <span
        onClick={ this.handlePinboardButtonClick.bind(this) }
        className={ cx(styles.wrapper, { 'is-pinned': isPinned }, className) }
      />
    );
  }
}

ItemPinButton.propTypes = {
  suggestion: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    isPinned: PropTypes.bool,
  }),
  onClick: PropTypes.func,
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
};
