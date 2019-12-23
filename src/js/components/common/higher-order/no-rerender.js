import PropTypes from 'prop-types';
import React, { Component } from 'react';


export default function (SubComponent) {
  class NoRerender extends Component {
    shouldComponentUpdate() {
      /* istanbul ignore next */
      return false;
    }

    render() {
      return (
        <SubComponent {...this.props}>
          {this.props.children}
        </SubComponent>
      );
    }
  }

  NoRerender.propTypes = {
    children: PropTypes.node,
  };

  return NoRerender;
}
