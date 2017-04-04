import React, { PropTypes, Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';
import { outerWrapperStyle, innerWrapperStyle } from './route-transition.style';


export default class RouteTransition extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.pathname !== nextProps.pathname;
  }

  willEnter() {
    return {
      opacity: 0,
      scale: 0.95
    };
  }

  willLeave(key, value) {
    return {
      opacity: spring(0, defaultConfig()),
      scale: spring(0.95, defaultConfig())
    };
  }

  getStyles() {
    const { children, pathname } = this.props;

    return [
      {
        key: pathname,
        data: {
          handler: children
        },
        style: {
          opacity: spring(1, defaultConfig()),
          scale: spring(1, defaultConfig())
        }
      }
    ];
  }

  render() {
    if (global.disableAnimation) {
      return this.props.children;
    }
    return (
      <TransitionMotion
        styles={ this.getStyles() }
        willEnter={ this.willEnter }
        willLeave={ this.willLeave }
      >
        { interpolated =>
          <div style={ outerWrapperStyle }>
            { interpolated.map(config => {
              const { key, style, data } = config;
              return (
                <div
                  key={ `${key}-transition` }
                  style={ {
                    ...innerWrapperStyle,
                    opacity: style.opacity,
                    transform: `scale(${style.scale})`
                  } }
                >
                 { data.handler }
                </div>
              );
            }) }
          </div>
        }
      </TransitionMotion>
    );
  }
}

RouteTransition.propTypes = {
  pathname: PropTypes.string.isRequired,
  children: PropTypes.node
};
