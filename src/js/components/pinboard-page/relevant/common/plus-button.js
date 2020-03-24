import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './plus-button.sass';


export default function PlusButton(props) {
  const { className, onClick } = props;
  return (
    <div className={ cx(styles.plusButton, className) } onClick={ onClick } />
  );
}

PlusButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};
