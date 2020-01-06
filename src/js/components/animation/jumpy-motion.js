import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Transition, SwitchTransition } from 'react-transition-group';
import { QUICK_ANIMATION_DURATION } from 'utils/constants';


const jumpyMotionStyles = (translateY) => ({
  entering: { transform: `translateY(${translateY}px)` },
  entered: { transform: 'translateY(0)', transition: `transform ${ QUICK_ANIMATION_DURATION }ms ease-in-out` },
  exiting: { transform: `translateY(${translateY}px)` },
});

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
    if (isActive !== state.prevIsActive) {
      if (isActive) {
        return { startMotion: true, prevIsActive: isActive };
      }
      return { prevIsActive: isActive };
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
    const transitionStyles = jumpyMotionStyles(translateY);
    return (
      <SwitchTransition mode='out-in'>
        <Transition
          key={ startMotion ? 'transition-out' : 'transition-in' }
          in={ true }
          timeout={ 10 }>
          {
            state => (
              <div style={ transitionStyles[state] }>
                { children }
              </div>
            )
          }
        </Transition>
      </SwitchTransition>
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
