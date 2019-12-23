import PropTypes from 'prop-types';
import React from 'react';

import styles from './item-unpin-button.sass';


export default function ItemUnpinButton(props) {
  return (
    <span
      className={ styles.itemUnpinButton }
      onClick={ props.onClick }
    />
  );
}

ItemUnpinButton.propTypes = {
  onClick: PropTypes.func,
};

ItemUnpinButton.defaultProps = {
  onClick: () => {},
};
