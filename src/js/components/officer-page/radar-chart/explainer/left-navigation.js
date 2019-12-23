import PropTypes from 'prop-types';
import React from 'react';

import styles from './left-navigation.sass';


export default function LeftNavigation(props) {
  const { text, onClickHandler } = props;

  return (
    <span
      className={ styles.leftNavigation }
      onClick={ onClickHandler }
    >
      <div className='left-arrow'/>
      { text }
    </span>
  );
}

LeftNavigation.propTypes = {
  text: PropTypes.string,
  onClickHandler: PropTypes.func,
};
