import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';

import { defaultConfig } from 'utils/spring-presets';


export default class FadeTransition extends Component {
  componentWillReceivedProps(nextProps) {
    const { children } = this.props;
    if (children && children.key !== nextProps.children.key) {
      this.prevChildren = children;
    }
  }

  defaultStyles() {
    const { children } = this.props;
    const styles = [];
    if (children) {
      styles.push({
        key: children.key,
        data: children,
        style: {
          opacity: 1
        }
      });
    }
    if (this.prevChildren) {
      styles.push({
        key: this.prevChildren.key,
        data: this.prevChildren,
        style: {
          opacity: 0
        }
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
          opacity: spring(1, defaultConfig())
        }
      });
    }
    if (this.prevChildren) {
      styles.push({
        key: this.prevChildren.key,
        data: this.prevChildren,
        style: {
          opacity: spring(0, defaultConfig())
        }
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
                if (this.prevChildren
                    && data.key === this.prevChildren.key
                    && style.opacity === 0) {
                  this.prevChildren = null;
                  return null;
                }
                return React.cloneElement(data, { style: {
                  ...style, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0
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
  children: PropTypes.node
};
