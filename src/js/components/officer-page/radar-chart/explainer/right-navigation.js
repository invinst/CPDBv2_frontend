import React, { PropTypes } from 'react';

import styles from './right-navigation.sass';


export default function RightNavigation(props) {
  const { text, onClickHandler } = props;

  return (
    <span
      className={ styles.rightNavigation }
      onClick={ onClickHandler }
    >
      { text }
      <div className='right-arrow'/>
    </span>
  );
}

RightNavigation.propTypes = {
  text: PropTypes.string,
  onClickHandler: PropTypes.func,
};
