import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';


export default class FadeTransition extends Component {
  defaultStyles() {
    const { children } = this.props;
    const styles = [];
    if (children) {
      styles.push({
        key: children.key,
        data: children,
        style: {
          opacity: 1,
        },
      });
    }
    return styles;
  }

  styles() {
    const { children } = this.props;
    const styles = [];
    if (children) {
      styles.push({
        key: children.key,
        data: children,
        style: {
          opacity: spring(1, defaultConfig()),
        },
      });
    }
    return styles;
  }

  willEnter() {
    return { opacity: 0 };
  }

  willLeave() {
    return { opacity: spring(0, defaultConfig()) };
  }

  render() {
    if (global.disableAnimation) {
      return this.props.children;
    }
    return (
      <TransitionMotion
        defaultStyles={ this.defaultStyles() }
        styles={ this.styles() }
        willEnter={ this.willEnter }
        willLeave={ this.willLeave }>
        {
          (interpolatedStyles) => (
            <div style={ { position: 'relative', height: '100%', width: '100%' } }>
              {
                interpolatedStyles.map(({ data, style }) => {
                  return React.cloneElement(data, { style: {
                    ...style, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                  } });
                })
              }
            </div>
          )
        }
      </TransitionMotion>
    );
  }
}

FadeTransition.propTypes = {
  children: PropTypes.node,
};
