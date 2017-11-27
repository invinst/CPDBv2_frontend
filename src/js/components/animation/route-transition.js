import React, { PropTypes, Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';
import { outerWrapperStyle, innerWrapperStyle } from './route-transition.style';


export default class RouteTransition extends Component {
  /**
   * Return the same key for some paths so that animation won't trigger
   *
   *  - Officer paths such as /officer/123/ and /officer/123/timeline/ should give the same key
   *  - Complaint paths such as /complaint/234/456/ and /complaint/234/789/ should give the same key
   *  - Search paths such as /search/ and /search/terms/ should always give the same key
   */
  getRouteTransitionKey() {
    const { pathname } = this.props;
    const patterns = [
      /.*(officer\/\d+).*/,
      /.*(complaint\/\d+).*/,
      /.*(search)\/.*/
    ];
    for (let ind in patterns) {
      const pattern = patterns[ind];
      if (pathname.match(pattern)) {
        return pathname.replace(pattern, '$1');
      }
    }
    return pathname;
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
    const { children } = this.props;
    const routeTransitionKey = this.getRouteTransitionKey();

    return [
      {
        key: routeTransitionKey,
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
