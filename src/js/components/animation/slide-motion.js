import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';


export default class SlideMotion extends Component {
  render() {
    const { show, children, offsetX } = this.props;

    if (global.disableAnimation) {
      return show ? children : null;
    }

    return (
      <Motion defaultStyle={ { translateX: show ? 0 : offsetX } }
        style={ { translateX: spring(show ? 0 : offsetX) } }>
        { ({ translateX }) => {
          if (translateX === offsetX && !show) {
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
  show: PropTypes.bool,
  offsetX: PropTypes.number
};
