import React, { PropTypes, Component } from 'react';

import SmoothScroller from 'components/common/smooth-scroller';


export default class ScrollIntoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    const offset = this.getDesiredOffset(nextProps);

    if (offset !== null) {
      this.setState({
        offset,
      });
    }
  }

  getDesiredOffset(nextProps) {
    const { focusedClassName } = nextProps;

    if (!this.scrollerRef || focusedClassName === this.props.focusedClassName) return null;
    const element = document.getElementsByClassName(focusedClassName)[0];
    if (element === undefined) return null;

    const parentRect = this.scrollerRef.view.getBoundingClientRect();
    const childRect = element.getBoundingClientRect();
    let desiredChildTop;

    if (childRect.top - parentRect.top < 0) {
      desiredChildTop = parentRect.top;
    } else if (childRect.top - parentRect.top > parentRect.height - childRect.height) {
      desiredChildTop = parentRect.top + parentRect.height - childRect.height;
    } else {
      return null;
    }

    return this.scrollerRef.getScrollTop() - (desiredChildTop - childRect.top);
  }

  handleRef(scrollerRef) {
    if (scrollerRef === null) return;
    this.scrollerRef = scrollerRef;
  }

  render() {
    const { children, style } = this.props;

    return (
      <SmoothScroller
        selectedOffset={ this.state.offset }
        style={ style }
        onScrollerRef={ this.handleRef.bind(this) }>
        { children }
      </SmoothScroller>
    );
  }
}

ScrollIntoView.propTypes = {
  children: PropTypes.node,
  focusedClassName: PropTypes.string,
  style: PropTypes.object,
};
