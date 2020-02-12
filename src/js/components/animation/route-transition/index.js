import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { ANIMATION_DURATION, QUICK_ANIMATION_DURATION } from 'utils/constants';
import { scrollToTop } from 'utils/dom';
import styles from './route-transition.sass';


const ROUTE_TRANSITION_CLASS_NAMES = {
  enter: styles.routeTransitionEnter,
  enterActive: styles.routeTransitionEnterActive,
};

export default class RouteTransition extends Component {
  /**
   * Return the same key for some paths so that animation won't trigger
   *
   *  - Officer paths such as /officer/123/ and /officer/123/social/ should give the same key
   *  - Complaint paths such as /complaint/234/456/ and /complaint/234/789/ should give the same key
   *  - Search paths such as /search/ and /search/terms/ should always give the same key
   */
  static getRouteTransitionKey(pathname) {
    pathname = pathname.replace(/^\/edit(.*)/, '$1');

    const patterns = [
      /\/officer\/\d+\//,
      /\/pinboard\/[A-Za-z0-9]+\//,
      /\/search\//,
    ];
    for (let ind in patterns) {
      const pattern = patterns[ind];
      if (pathname.match(pattern)) {
        pathname = pathname.match(pattern)[0];
      }
    }
    if (pathname === '/search/')
      pathname = '/';
    return pathname;
  }

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
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
        showOverlay: true,
        prevKey: currentKey,
        prevPageLoading: pageLoading,
      };
    }
    else if (!pageLoading && prevPageLoading) {
      scrollToTop();
      return {
        showOverlay: false,
        prevKey: currentKey,
        prevPageLoading: pageLoading,
      };
    }
    return { prevPageLoading: pageLoading, prevKey: currentKey };
  }

  render() {
    if (global.disableAnimation) {
      return this.props.children;
    }

    const { children, pathname } = this.props;
    const { showOverlay } = this.state;
    const key = showOverlay ? 'loading' : RouteTransition.getRouteTransitionKey(pathname);
    return (
      <TransitionGroup>
        <CSSTransition
          key={ key }
          timeout={ { enter: QUICK_ANIMATION_DURATION, exit: ANIMATION_DURATION } }
          classNames={ ROUTE_TRANSITION_CLASS_NAMES }
          unmountOnExit={ true }
        >
          { showOverlay ? <div className={ styles.overlayStyle } /> : children }
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
