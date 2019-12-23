import React, { PropTypes } from 'react';

import HoverableButton from 'components/common/hoverable-button';
import { style } from './log-out-button.style';


export default function LogOutButton(props) {
  const { show } = props;

  return show ?
    <HoverableButton onClick={ () => props.logOut() } style={ style } className='test--logout-button'>
      Log Out
    </HoverableButton>
    : null;
}

LogOutButton.propTypes = {
  show: PropTypes.bool,
  logOut: PropTypes.func,
};
