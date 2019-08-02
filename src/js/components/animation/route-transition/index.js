import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';
import { find } from 'lodash';

import { defaultConfig } from 'utils/spring-presets';
import { scrollToTop } from 'utils/dom';
import { overlayStyle } from './route-transition.style';

export default class RouteTransition extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showOverlay: false,
      contents: [
        {
          key: this.getRouteTransitionKey(props.pathname),
          handler: props.children,
          opacity: 1,
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pathname, pageLoading, children } = nextProps;
    const nextKey = this.getRouteTransitionKey(pathname);
    const prevKey = this.getRouteTransitionKey(this.props.pathname);
    if (nextKey !== prevKey) {
      this.setState({
        showOverlay: true,
        contents: [
          {
            handler: children,
            key: nextKey,
            opacity: 0,
          },
          {
            handler: this.props.children,
            key: prevKey,
            opacity: 1,
          },
        ],
      });
    } else if (!pageLoading && this.props.pageLoading && this.overlayCompletelyCover) {
      scrollToTop();
      this.setState({
        showOverlay: false,
        contents: [
          {
            handler: this.props.children,
            key: prevKey,
            opacity: 1,
          },
        ],
      });
    } else {
      let { contents } = this.state;
      const content = find(contents, obj => obj.key === nextKey);
      content.handler = children;
      this.setState({ contents });
    }
  }

  /**
   * Return the same key for some paths so that animation won't trigger
   *
   *  - Officer paths such as /officer/123/ and /officer/123/social/ should give the same key
   *  - Complaint paths such as /complaint/234/456/ and /complaint/234/789/ should give the same key
   *  - Search paths such as /search/ and /search/terms/ should always give the same key
   */
  getRouteTransitionKey(pathname) {
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

  handleOverlayTransitionEnd() {
    const { pageLoading, children, pathname } = this.props;
    if (!pageLoading && this.state.showOverlay) {
      setTimeout(() => {
        scrollToTop();
        this.setState({
          showOverlay: false,
          contents: [
            {
              handler: children,
              key: this.getRouteTransitionKey(pathname),
              opacity: 1,
            },
          ],
        });
      });
    }
  }

  render() {
    const { showOverlay, contents } = this.state;

    if (global.disableAnimation) {
      return this.props.children;
    }

    return (
      <div>
        <Motion
          onRest={ this.handleOverlayTransitionEnd.bind(this) }
          defaultStyle={ { opacity: showOverlay ? 1 : 0 } }
          style={ { opacity: spring(showOverlay ? 1 : 0, defaultConfig()) } }>
          { ({ opacity }) => {
            this.overlayCompletelyCover = false;
            /* istanbul ignore next */
            if (opacity === 0) {
              return null;
            } else if (opacity === 1) {
              this.overlayCompletelyCover = true;
            }

            return <div style={ { ...overlayStyle, opacity } } />;
          } }
        </Motion>
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
