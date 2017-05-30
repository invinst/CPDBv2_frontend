import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';

import { innerHeight } from 'utils/dom';
import { defaultConfig } from 'utils/spring-presets';


export default class ExpandMotion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      childHeight: 0
    };

    this.handleChildrenRef = this.handleChildrenRef.bind(this);
  }

  handleChildrenRef(component) {
    const { childHeight } = this.state;
    if (component) {
      const newChildHeight = innerHeight(ReactDOM.findDOMNode(component));
      if (newChildHeight !== childHeight) {
        this.setState({ childHeight: newChildHeight });
      }
    }
  }

  render() {
    const { show, children } = this.props;
    const { childHeight } = this.state;

    if (global.disableAnimation) {
      return show ? children : null;
    }

    return (
      <Motion
        defaultStyle={ { height: show ? childHeight : 0 } }
        style={ { height: spring(show ? childHeight : 0, defaultConfig()) } }>
        { ({ height }) => {
          if (height === 0 && !show) {
            return null;
          }

          return React.cloneElement(
            this.props.children, { ref: this.handleChildrenRef, style: { height: `${height}px` }
            });
        } }
      </Motion>
    );
  }
}

ExpandMotion.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool
};
