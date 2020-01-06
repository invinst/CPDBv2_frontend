import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { MEDIUM_ANIMATION_DURATION } from 'utils/constants';
import styles from './slide-motion.sass';


const SLIDE_TRANSITION_CLASS_NAMES = {
  enter: styles.slideTransitionEnter,
  enterActive: styles.slideTransitionEnterActive,
  exit: styles.slideTransitionExit,
  exitActive: styles.slideTransitionExitActive,
};

export default function SlideMotion(props) {
  const { show, children } = props;
  if (global.disableAnimation) {
    return show ? children : null;
  }
  return (
    <CSSTransition
      in={ show }
      unmountOnExit={ true }
      timeout={ MEDIUM_ANIMATION_DURATION }
      classNames={ SLIDE_TRANSITION_CLASS_NAMES }>
      {
        React.cloneElement(
          children, {
            style: { ...children.props.style },
          }
        )
      }
    </CSSTransition>
  );
}

SlideMotion.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
};
