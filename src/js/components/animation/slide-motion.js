import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import { faster } from 'utils/spring-presets';


export default class SlideMotion extends Component {
  render() {
    const { show, children } = this.props;

    if (global.disableAnimation) {
      return show ? children : null;
    }

    return (
      <Motion defaultStyle={ { translateX: show ? 0 : 100 } }
        style={ { translateX: spring(show ? 0 : 100, faster) } }>
        { ({ translateX }) => {
          if (translateX === 100 && !show) {
            return null;
          }

          return React.cloneElement(
            this.props.children, {
              style: { ...children.props.style, transform: `translateX(${translateX}%)` }
            }
          );
        } }
      </Motion>
    );
  }
}

SlideMotion.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool
};
