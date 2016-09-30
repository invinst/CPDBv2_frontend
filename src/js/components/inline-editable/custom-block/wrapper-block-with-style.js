import React, { Component, PropTypes } from 'react';
import ConfiguredRadium from 'utils/configured-radium';


class WrapperBlockWithStyle extends Component {
  render() {
    const { style, element, children } = this.props;

    return React.createElement(
      element,
      { style },
      children
    );
  }
}

WrapperBlockWithStyle.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
  element: PropTypes.string
};

export default ConfiguredRadium(WrapperBlockWithStyle);
