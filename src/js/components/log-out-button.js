import React, { Component, PropTypes } from 'react';

import HoverableButton from 'components/common/hoverable-button';
import { style } from './log-out-button.style';


export default class LogOutButton extends Component {
  render() {
    const { show } = this.props;

    return (
      show ?
        <HoverableButton onClick={ () => this.props.logOut() } style={ style } className='test--logout-button'>
          Log Out
        </HoverableButton>
        : null
    );
  }
}

LogOutButton.propTypes = {
  show: PropTypes.bool,
  logOut: PropTypes.func
};
