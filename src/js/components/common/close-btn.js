import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import {
  closeButtonStyle
} from './close-btn.style';


class CloseButton extends React.Component {
  render() {
    const { imageName, hoveredImageName } = this.props;
    return (
      <button
        style={ { ...closeButtonStyle(imageName, hoveredImageName), ...this.props.style } }
        className={ this.props.className }
        onClick={ this.props.onClick }
      />
    );
  }
}

CloseButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
  imageName: PropTypes.string,
  hoveredImageName: PropTypes.string,
};

CloseButton.defaultProps = {
  imageName: 'ic-close.svg',
  hoveredImageName: 'ic-close-hover.svg',
};

export default ConfiguredRadium(CloseButton);
