import React, { Component, PropTypes } from 'react';

import styles from './item-unpin-button.sass';


export default class ItemUnpinButton extends Component {
  handleUnpinButtonClick() {
    const { removeItemInPinboardPage } = this.props;
    const { type, id, isPinned } = this.props.item;

    removeItemInPinboardPage({
      type: type,
      id: id,
      isPinned: isPinned,
    });
  }

  render() {
    return (
      <span
        className={ styles.wrapper }
        onClick={ this.handleUnpinButtonClick.bind(this) } />
    );
  }
}

ItemUnpinButton.propTypes = {
  item: PropTypes.object,
  removeItemInPinboardPage: PropTypes.func,
};
