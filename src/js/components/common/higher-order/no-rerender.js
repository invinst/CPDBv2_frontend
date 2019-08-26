import React, { Component, PropTypes } from 'react';


export default function (SubComponent) {
  class NoRerender extends Component {
    shouldComponentUpdate() {
      /* istanbul ignore next */
      return false;
    }

    render() {
      return React.createElement(SubComponent, this.props, this.props.children);
    }
  }

  NoRerender.propTypes = {
    children: PropTypes.node,
  };

  return NoRerender;
}
