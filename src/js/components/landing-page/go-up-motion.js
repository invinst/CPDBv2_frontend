import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';


export default class GoUpMotion extends Component {
  render() {
    const { children } = this.props;
    const motionStyle = {
      translateY: spring(100, defaultConfig()),
    };

    if (global.disableAnimation) {
      return children(0);
    }

    return (
      <Motion
        style={ motionStyle }>
        { ({ translateY }) => {
          return children(translateY);
        } }
      </Motion>
    );
  }
}

GoUpMotion.propTypes = {
  maxOpacity: PropTypes.number,
  children: PropTypes.func,
  show: PropTypes.bool,
};

GoUpMotion.defaultProps = {
  maxOpacity: 1,
};
