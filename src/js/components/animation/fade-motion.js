import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { ANIMATION_DURATION } from 'utils/constants';
import styles from './fade-motion.sass';


const FADE_MOTION_CLASS_NAMES = {
  enter: styles.fadeMotionEnter,
  enterActive: styles.fadeMotionEnterActive,
  exit: styles.fadeMotionExit,
  exitActive: styles.fadeMotionExitActive,
};

export default function FadeMotion(props) {
  const { show, children } = props;
  if (global.disableAnimation) {
    return show ? children() : null;
  }

  return (
    <CSSTransition
      in={ show }
      unmountOnExit={ true }
      timeout={ ANIMATION_DURATION }
      classNames={ FADE_MOTION_CLASS_NAMES }>
      { children() }
    </CSSTransition>
  );
}

FadeMotion.propTypes = {
  children: PropTypes.func,
  show: PropTypes.bool,
};
