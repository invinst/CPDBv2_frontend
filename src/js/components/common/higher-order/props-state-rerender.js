import { Component, createElement, PropTypes } from 'react';
import { isEqual } from 'lodash';


export default function (SubComponent) {
  class PropsStateRerender extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return !isEqual(this.state, nextState) || !isEqual(this.props, nextProps);
    }

    render() {
      return createElement(SubComponent, this.props, this.props.children);
    }
  }

  PropsStateRerender.propTypes = {
    children: PropTypes.node,
  };

  return PropsStateRerender;
}
