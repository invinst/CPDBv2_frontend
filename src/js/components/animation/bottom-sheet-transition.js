import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { compact, map } from 'lodash';

import { defaultConfig } from 'utils/spring-presets';


const getBottomHeight = () => {
  return 44 - window.innerHeight;
};

export default class BottomSheetTransition extends Component {
  styles() {
    const { children } = this.props;

    const styles = [];
    if (children) {
      styles.push({
        key: children.key,
        data: children,
        style: {
          opacity: spring(1, defaultConfig()),
          bottom: spring(0, defaultConfig())
        }
      });
    }
    return styles;
  }

  willEnter() {
    return { opacity: 0, bottom: getBottomHeight() };
  }

  willLeave() {
    return { opacity: spring(0, defaultConfig()), bottom: spring(getBottomHeight(), defaultConfig()) };
  }

  render() {
    if (global.disableAnimation) {
      const { children } = this.props;
      if (!children) return null;
      return React.cloneElement(children, { style: { ...children.props.style, opacity: 1, bottom: '0px' } });
    }

    return (
      <TransitionMotion
        styles={ this.styles() }
        willEnter={ this.willEnter }
        willLeave={ this.willLeave }
        >
        {
          (interpolatedStyles) => {
            if (!compact(map(interpolatedStyles, ({ data }) => data)).length) return null;
            return (
              <div>
                {
                  interpolatedStyles.map(({ data, style }) => {
                    return React.cloneElement(data,
                      { style: { ...data.props.style, opacity: style.opacity, bottom: `${style.bottom}px` } });
                  })
                }
              </div>
            );
          }
        }
      </TransitionMotion>
    );
  }
}

BottomSheetTransition.propTypes = {
  children: PropTypes.node
};
