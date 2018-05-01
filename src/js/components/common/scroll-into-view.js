import React, { PropTypes, Component } from 'react';

import SmoothScroller from 'components/common/smooth-scroller';


export default class ScrollIntoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { focusedClassName } = nextProps;
    const previousFocusedClassName = this.props.focusedClassName;

    if (!this.scrollerRef || focusedClassName === previousFocusedClassName) return;

    const element = document.getElementsByClassName(focusedClassName)[0];
    if (element === undefined) return;

    const parentRect = this.scrollerRef.view.getBoundingClientRect();
    const childRect = element.getBoundingClientRect();
    const focusedItemOffset = childRect.top - parentRect.top;
    if ((focusedItemOffset < 0) || (focusedItemOffset > parentRect.height - childRect.height)) {
      const previousFocusedItem = document.getElementsByClassName(previousFocusedClassName)[0];
      const scrollOffset = previousFocusedItem
        ? childRect.top - previousFocusedItem.getBoundingClientRect().top
        : focusedItemOffset;
      const limit = (parentRect.height - childRect.height) / 2;
      const limitedScrollOffset = scrollOffset > 0
        ? Math.min(limit, scrollOffset)
        : Math.max(-limit, scrollOffset);

      this.setState({
        offset: this.scrollerRef.getScrollTop() + limitedScrollOffset
      });
    }
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

ScrollIntoView.defaultProps = {
  initialOffset: 0
};

ScrollIntoView.propTypes = {
  children: PropTypes.node,
  focusedClassName: PropTypes.string,
  style: PropTypes.object
};
