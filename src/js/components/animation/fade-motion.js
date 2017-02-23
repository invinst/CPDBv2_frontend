import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';


export default class FadeMotion extends Component {
  render() {
    const { show, children } = this.props;
    const defaultStyle = { opacity: show ? 1 : 0 };
    const motionStyle = {
      opacity: spring(show ? 1 : 0, defaultConfig())
    };

    if (global.disableAnimation) {
      return show ? children(1) : null;
    }

    return (
      <Motion
        defaultStyle={ defaultStyle }
        style={ motionStyle }>
        { ({ opacity }) => {
          if (opacity === 0 && !show) {
            return null;
          }

          return children(opacity);
        } }
      </Motion>
    );
  }
}

FadeMotion.propTypes = {
  children: PropTypes.func,
  show: PropTypes.bool
};
