import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { find, difference, isEmpty } from 'lodash';
import { CSSTransition } from 'react-transition-group';

import { ANIMATION_DURATION } from 'utils/constants';
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
      /.*(complaint\/\d+).*/,
      /.*(search)\/.*/,
    ];
    for (let ind in patterns) {
      const pattern = patterns[ind];
      if (pathname.match(pattern)) {
        return pathname.replace(pattern, '$1');
      }
    }
    return pathname;
  }

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      contents: [
        {
          key: RouteTransition.getRouteTransitionKey(props.pathname),
          handler: props.children,
          opacity: 1,
        },
      ],
      prevKey: RouteTransition.getRouteTransitionKey(props.pathname),
      prevPageLoading: props.pageLoading,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { children, pageLoading, pathname } = props;
    const { prevKey, prevPageLoading, contents } = state;
    const currentKey = RouteTransition.getRouteTransitionKey(pathname);

    const betweenLandingAndSearchPage = isEmpty(difference(['/', 'search'], [currentKey, prevKey]));
    if (betweenLandingAndSearchPage)
      return null;

    if (currentKey !== prevKey) {
      return {
        showOverlay: true,
        contents: [
          contents[0],
          {
            handler: children,
            key: currentKey,
            opacity: 0,
          },
        ],
        prevKey: currentKey,
        prevPageLoading: pageLoading,
      };
    }
    else if (!pageLoading && prevPageLoading) {
      scrollToTop();
      return {
        showOverlay: false,
        contents: [
          {
            handler: children,
            key: currentKey,
            opacity: 1,
          },
        ],
        prevKey: currentKey,
        prevPageLoading: pageLoading,
      };
    }
    else if (!['/', 'search'].includes(currentKey)) {
      const content = find(contents, obj => obj.key === currentKey);
      content.handler = children;
      return {
        contents,
        prevKey: currentKey,
        prevPageLoading: pageLoading,
      };
    }
    return { prevPageLoading: pageLoading, prevKey: currentKey };
  }

  render() {
    const { showOverlay, contents } = this.state;

    if (global.disableAnimation) {
      return this.props.children;
    }

    return (
      <div>
        <CSSTransition
          in={ showOverlay }
          unmountOnExit={ true }
          timeout={ ANIMATION_DURATION }
          classNames={ ROUTE_TRANSITION_CLASS_NAMES }>
          <div className={ styles.overlayStyle } />
        </CSSTransition>
        {
          contents.map(content => (
            <div key={ content.key } style={ { opacity: content.opacity } }>
              { content.handler }
            </div>
          ))
        }
      </div>
    );
  }
}

RouteTransition.propTypes = {
  children: PropTypes.node,
  pathname: PropTypes.string,
  pageLoading: PropTypes.bool,
};
