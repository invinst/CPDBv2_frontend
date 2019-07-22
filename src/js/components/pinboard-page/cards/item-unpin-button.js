import React, { Component, PropTypes } from 'react';

import styles from './item-unpin-button.sass';


export default class ItemUnpinButton extends Component {
  render() {
    return (
      <span
        className={ styles.itemUnpinButton }
        onClick={ this.props.onClick }
      />
    );
  }
}

ItemUnpinButton.propTypes = {
  onClick: PropTypes.func,
};

ItemUnpinButton.defaultProps = {
  onClick: () => {},
};
