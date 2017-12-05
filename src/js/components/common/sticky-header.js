import React, { Component, PropTypes } from 'react';
import { EventEmitter } from 'fbemitter';

import { stickyStyle, childrenWrapperStyle } from './sticky-header.style';
import { isScrolledToBottom } from 'utils/dom';


const emitter = new EventEmitter();

export const recalculateStickyness = () => {
  emitter.emit('recalculate');
};

export default class StickyHeader extends Component {
  constructor() {
    super();
    this.state = {
      isSticky: false,
      isAtBottom: false,
      placeholderHeight: 0
    };

    this.recalculateStickyness = this.recalculateStickyness.bind(this);
  }

  componentWillMount() {
    this.subscription = emitter.addListener('recalculate', this.recalculateStickyness);
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  isSticky() {
    if (this.placeholderElement) {
      const fromTop = this.placeholderElement.getBoundingClientRect().top;
      return fromTop < 0;
    }

    return false;
  }

  recalculateStickyness() {
    const isSticky = this.isSticky();
    const isAtBottom = isScrolledToBottom();

    if (isSticky !== this.state.isSticky || isAtBottom !== this.state.isAtBottom) {
      this.setState({
        isSticky,
        isAtBottom,
        placeholderHeight: isSticky ? this.childrenElement.getBoundingClientRect().height : 0
      });
      this.props.handleStateChange(isSticky, isAtBottom);
    }
  }

  childrenWrapperStyle() {
    const { style } = this.props;
    const { isSticky } = this.state;
    return {
      ...childrenWrapperStyle,
      ...(isSticky ? stickyStyle : {}),
      ...style
    };
  }

  render() {
    const { children, ...rest } = this.props;
    delete rest.style;
    delete rest.handleStateChange;

    const { placeholderHeight } = this.state;
    const childrenWrapperStyle = this.childrenWrapperStyle();
    return (
      <div { ...rest }>
        <div style={ { paddingBottom: `${placeholderHeight}px` } } ref={ el => { this.placeholderElement = el; } }/>
        <div style={ childrenWrapperStyle } ref={ el => { this.childrenElement = el; } }>
          { children }
        </div>
      </div>
    );
  }
}

StickyHeader.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  handleStateChange: PropTypes.func
};

StickyHeader.defaultProps = {
  handleStateChange: () => {}
};
