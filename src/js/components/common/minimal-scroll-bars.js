import React, { PropTypes, Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { omit } from 'lodash';

import { thumbStyle } from './minimal-srcoll-bar.style';


export default class MinimalScrollBars extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);

    this.renderThumb = this.renderThumb.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop !== this.props.scrollTop) {
      this.scrollerRef.scrollTop(nextProps.scrollTop);
    }
    if (nextProps.scrollLeft !== this.props.scrollLeft) {
      this.scrollerRef.scrollLeft(nextProps.scrollLeft);
    }
  }

  renderThumb({ style, ...props }) {
    return (
      <div style={ { ...style, ...thumbStyle } } { ...props } />
    );
  }

  renderView({ style }) {
    return (
      <div style={ { ...style, ...this.props.style.view } } />
    );
  }

  handleScrollerRef(el) {
    this.scrollerRef = el;
    this.props.onScrollerRef(el);
  }

  render() {
    const rest = omit(this.props, ['onScrollerRef', 'style', 'scrollTop', 'scrollLeft']);
    return (
      <Scrollbars
        thumbSize={ 120 }
        renderThumbVertical={ this.renderThumb }
        renderView={ this.renderView.bind(this) }
        ref={ this.handleScrollerRef.bind(this) }
        style={ this.props.style.container }
        { ...rest }
      />
    );
  }
}

MinimalScrollBars.defaultProps = {
  onScrollerRef: () => {},
  style: {}
};

MinimalScrollBars.propTypes = {
  onScrollerRef: PropTypes.func,
  style: PropTypes.object,
  scrollTop: PropTypes.number,
  scrollLeft: PropTypes.number
};
