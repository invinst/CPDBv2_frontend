import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import withPinnable from 'components/common/with-pinnable';
import styles from 'components/common/item-pin-button.sass';


class ItemPinButton extends Component {
  render() {
    const { className, showHint } = this.props;
    const { isPinned } = this.props.item;

    return (
      <div className={ cx(styles.itemPinButton, { 'is-pinned': isPinned }, className) }>
        <div className='pin-button' />
        { showHint && <div className='pin-action-hint'> Unpin? </div> }
      </div>
    );
  }
}

ItemPinButton.propTypes = {
  item: PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    isPinned: PropTypes.bool,
  }),
  addOrRemoveItemInPinboard: PropTypes.func,
  className: PropTypes.string,
  showHint: PropTypes.bool,
};

ItemPinButton.defaultProps = {
  showHint: true,
};

export default withPinnable(ItemPinButton);
