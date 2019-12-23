import PropTypes from 'prop-types';
import React from 'react';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';

import styles from './simple-popup.sass';


export default function SimplePopup(props) {
  const { id, children } = props;

  return (
    <ReactTooltip
      id={ id }
      className={ cx('popup', styles.simplePopup) }
      effect='solid'
      type='light'
    >
      { children }
    </ReactTooltip>
  );
}

SimplePopup.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
};
