import React, { PropTypes } from 'react';
import Radium from 'radium';

import {
  closeButtonStyle, closeButtonIconStyle, closeButtonIconWrapperStyle
} from './close-btn.style';


class CloseButton extends React.Component {
  render() {
    return (
      <button style={ closeButtonStyle } className={ this.props.className }
        onClick={ this.props.onClick }>
        <span style={ closeButtonIconWrapperStyle }>
          <span style={ [closeButtonIconStyle.pseudo, closeButtonIconStyle.before] }/>
          <span style={ [closeButtonIconStyle.pseudo, closeButtonIconStyle.after] }/>
        </span>
      </button>
    );
  }
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
};

export default Radium(CloseButton);
