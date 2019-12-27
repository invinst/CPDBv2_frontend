import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Motion, spring, presets } from 'react-motion';


export default class JumpyMotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startMotion: false,
      prevIsActive: props.isActive,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { isActive } = props;
    if (!state.prevIsActive && isActive) {
      return { startMotion: true, prevIsActive: isActive };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { startMotion } = this.state;
    if (!prevState.startMotion && startMotion) {
      this.timeout = setTimeout(() => this.setState({ startMotion: false }), 10);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { startMotion } = this.state;
    const { children, translateY } = this.props;
    return (
      <Motion
        key='text-container'
        defaultStyle={ { translateY: 0 } }
        style={ {
          // "enter" transition effect: slide up from 15px under
          translateY: startMotion ? translateY : spring(0, presets.stiff),
        } }
      >
        {
          (style) => (
            <div style={ {
              transform: `translateY(${style.translateY}px)`,
            } }>
              { children }
            </div>
          )
        }
      </Motion>
    );
  }
}

JumpyMotion.propTypes = {
  isActive: PropTypes.bool,
  translateY: PropTypes.number,
  children: PropTypes.node,
};

JumpyMotion.defaultProps = {
  translateY: 15,
};
