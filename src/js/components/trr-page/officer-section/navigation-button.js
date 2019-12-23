import PropTypes from 'prop-types';
import React from 'react';

import style from './navigation-button.sass';


export default function NavigationButton(props) {
  const { text } = props;

  return (
    <div className={ `${style.navigationButton} no-print` }>
      <span className='navigation-button-text'>{ text }</span>
      <div className='navigation-button-arrow'/>
    </div>
  );
}

NavigationButton.propTypes = {
  text: PropTypes.string,
};
