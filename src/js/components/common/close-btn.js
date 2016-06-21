import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import {
  closeButtonStyle
} from './close-btn.style';


class CloseButton extends React.Component {
  render() {
    return (
      <button style={ [closeButtonStyle, this.props.style] } className={ this.props.className }
        onClick={ this.props.onClick }/>
    );
  }
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
};

export default ConfiguredRadium(CloseButton);
