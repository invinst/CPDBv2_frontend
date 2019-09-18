import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import withPinnable from 'components/common/with-pinnable';
import styles from './item-pin-button.sass';


class ItemPinButton extends Component {
  render() {
    const { className } = this.props;
    const { isPinned } = this.props.item;

    return (
      <span className={ cx(styles.wrapper, { 'is-pinned': isPinned }, className) } />
    );
  }
}

ItemPinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.string,
    isPinned: PropTypes.bool,
  }),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
};

export default withPinnable(ItemPinButton);
