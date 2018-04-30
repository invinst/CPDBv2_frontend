import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

import SmoothScroller from 'components/common/smooth-scroller';


export default class ScrollIntoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: props.initialOffset
    };
  }

  componentWillReceiveProps(nextProps) {
    const { focusedClassName } = nextProps;
    const previousFocusedClassName = this.props.focusedClassName;

    if (!this.el || focusedClassName === previousFocusedClassName) return;

    const element = document.getElementsByClassName(focusedClassName)[0];
    if (element === undefined) return;

    const parentRect = this.el.getBoundingClientRect();
    const childRect = element.getBoundingClientRect();
    const focusedItemOffset = childRect.top - parentRect.top;
    if ((focusedItemOffset < 0) || (focusedItemOffset > parentRect.height - childRect.height)) {
      const previousFocusedItem = document.getElementsByClassName(previousFocusedClassName)[0];
      const scrollOffset = previousFocusedItem
        ? childRect.top - previousFocusedItem.getBoundingClientRect().top
        : focusedItemOffset;

      this.setState(state => ({
        offset: state.offset + scrollOffset
      }));
    }
  }

  handleRef(element) {
    if (element === null) return;
    this.el = findDOMNode(element);
  }

  render() {
    const { children, style } = this.props;

    return (
      <SmoothScroller
        ref={ this.handleRef.bind(this) }
        selectedOffset={ this.state.offset }
        style={ style }>
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
  style: PropTypes.object,
  initialOffset: PropTypes.number
};
