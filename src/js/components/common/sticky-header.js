import React, { Component, PropTypes } from 'react';
import { EventEmitter } from 'fbemitter';

import { stickyStyle, childrenWrapperStyle } from './sticky-header.style';


const emitter = new EventEmitter();

export const recalculateStickyness = () => {
  emitter.emit('recalculate');
};

export default class StickyHeader extends Component {
  constructor() {
    super();
    this.state = {
      isSticky: false,
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
      return fromTop <= 0;
    }

    return false;
  }

  recalculateStickyness() {
    const isSticky = this.isSticky();
    if (isSticky !== this.state.isSticky) {
      this.setState({
        isSticky,
        placeholderHeight: isSticky ? this.childrenElement.getBoundingClientRect().height : 0
      });
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
    const { children } = this.props;
    const { placeholderHeight } = this.state;
    const childrenWrapperStyle = this.childrenWrapperStyle();
    return (
      <div>
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
  style: PropTypes.object
};

StickyHeader.defaultProps = {
  handleStateChange: () => {}
};
