import PropTypes from 'prop-types';
import React from 'react';
import { Motion, spring } from 'react-motion';


export default function SlideMotion(props) {
  const { show, children, offsetX } = props;

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
          children, {
            style: { ...children.props.style, transform: `translateX(${translateX}%)` },
          }
        );
      } }
    </Motion>
  );
}

SlideMotion.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  offsetX: PropTypes.number,
};
