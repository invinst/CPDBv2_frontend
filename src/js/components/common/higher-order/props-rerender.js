import { Component, createElement, PropTypes } from 'react';
import { isEqual } from 'lodash';


export default function (SubComponent) {
  class PropsRerender extends Component {
    shouldComponentUpdate(nextProps) {
      return !isEqual(this.props, nextProps);
    }

    render() {
      return createElement(SubComponent, this.props, this.props.children);
    }
  }

  PropsRerender.propTypes = {
    children: PropTypes.node
  };

  return PropsRerender;
}
