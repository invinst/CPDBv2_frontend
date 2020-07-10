import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ANIMATION_DURATION, QUICK_ANIMATION_DURATION } from 'utils/constants';
import { scrollToTop } from 'utils/dom';
import styles from './route-transition.sass';
import { getPathNameKey } from 'utils/paths';


const ROUTE_TRANSITION_CLASS_NAMES = {
  enter: styles.routeTransitionEnter,
  enterActive: styles.routeTransitionEnterActive,
  exit: styles.routeTransitionExit,
  exitActive: styles.routeTransitionExitActive,
};

export default class RouteTransition extends Component {
  /**
   * Return the same key for some paths so that animation won't trigger
   *
   *  - Handle the same key for landing page '/' and search page '/search/
   *  - Return the pathname key
   */
  static getRouteTransitionKey(pathname) {
    let routeTransitionKey = getPathNameKey(pathname);
    if (routeTransitionKey === '/search/')
      routeTransitionKey = '/';
    return routeTransitionKey;
  }

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: props.pageLoading,
      prevKey: RouteTransition.getRouteTransitionKey(props.pathname),
      prevPageLoading: props.pageLoading,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pageLoading, pathname } = props;
    const { prevKey, prevPageLoading } = state;
    const currentKey = RouteTransition.getRouteTransitionKey(pathname);

    if (currentKey !== prevKey) {
      return {
        showOverlay: pageLoading,
        prevKey: currentKey,
        prevPageLoading: pageLoading,
      };
    }
    else if (prevPageLoading !== pageLoading) {
      if (!pageLoading)
        scrollToTop();
      return {
        showOverlay: pageLoading,
        prevKey: currentKey,
        prevPageLoading: pageLoading,
      };
    }
    return { prevPageLoading: pageLoading, prevKey: currentKey };
  }

  render() {
    const { showOverlay } = this.state;
    const { children, pathname } = this.props;
    const childrenComponent = showOverlay ? <div className={ styles.overlayStyle } /> : children;

    if (global.disableAnimation) {
      return childrenComponent;
    }

    const key = showOverlay ? 'loading' : RouteTransition.getRouteTransitionKey(pathname);
    return (
      <TransitionGroup>
        <CSSTransition
          key={ key }
          timeout={ { enter: ANIMATION_DURATION, exit: QUICK_ANIMATION_DURATION } }
          classNames={ ROUTE_TRANSITION_CLASS_NAMES }
          unmountOnExit={ true }
        >
          { childrenComponent }
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

RouteTransition.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
  pageLoading: PropTypes.bool,
};
