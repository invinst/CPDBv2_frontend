import React, { PropTypes, Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { find } from 'lodash';

import { defaultConfig } from 'utils/spring-presets';
import { outerWrapperStyle, innerWrapperStyle } from './route-transition.style';


export default class RouteTransition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: [{
        key: this.getRouteTransitionKey(props.pathname),
        data: {
          handler: props.children
        },
        style: {
          opacity: spring(1, defaultConfig()),
          scale: spring(1, defaultConfig())
        }
      }]
    };
  }

  componentWillReceiveProps(nextProps) {
    const { styles } = this.state;
    const { pathname, children } = nextProps;
    const newKey = this.getRouteTransitionKey(pathname);
    const styleObj = find(styles, { key: newKey });

    if (styleObj === undefined) {
      styles.push({
        key: newKey,
        data: {
          handler: children
        },
        style: {
          opacity: 0,
          scale: 0.95
        }
      });
      this.setState({ styles });
      setTimeout(this.startAnimation.bind(this), 150);
    } else {
      styleObj.data.handler = children;
      this.setState({ styles });
    }
  }

  startAnimation() {
    const { styles } = this.state;
    const lastChild = styles[styles.length - 1];
    lastChild.style.opacity = spring(1, defaultConfig());
    lastChild.style.scale = spring(1, defaultConfig());
    this.setState({ styles: [lastChild] });
  }

  /**
   * Return the same key for some paths so that animation won't trigger
   *
   *  - Officer paths such as /officer/123/ and /officer/123/timeline/ should give the same key
   *  - Complaint paths such as /complaint/234/456/ and /complaint/234/789/ should give the same key
   *  - Search paths such as /search/ and /search/terms/ should always give the same key
   */
  getRouteTransitionKey(pathname) {
    pathname = pathname.replace(/^\/edit(.*)/, '$1');
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

  render() {
    if (global.disableAnimation) {
      return this.props.children;
    }
    return (
      <TransitionMotion
        styles={ this.state.styles }
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
                    transform: style.scale !== 1 ? `scale(${style.scale})`: 'none'
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
