import React, { PropTypes } from 'react';
import Radium from 'radium';

import {
  closeButtonStyle
} from './close-btn.style';


class CloseButton extends React.Component {
  render() {
    return (
      <button style={ closeButtonStyle } className={ this.props.className }
        onClick={ this.props.onClick }/>
    );
  }
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Radium(CloseButton);
