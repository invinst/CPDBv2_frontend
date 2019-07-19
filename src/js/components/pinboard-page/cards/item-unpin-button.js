import React, { Component, PropTypes } from 'react';

import styles from './item-unpin-button.sass';


export default class ItemUnpinButton extends Component {
  render() {
    return (
      <div className={ styles.wrapper } onClick={ this.props.onClick }>
        <div className='inner-remove-symbol'/>
      </div>
    );
  }
}

ItemUnpinButton.propTypes = {
  onClick: PropTypes.func,
};

ItemUnpinButton.defaultProps = {
  onClick: () => {},
};
