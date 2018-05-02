import React, { PropTypes, Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { omit } from 'lodash';

import { thumbStyle } from './minimal-srcoll-bar.style';


export default class MinimalScrollBars extends Component {

  constructor(props, ...rest) {
    super(props, ...rest);

    this.renderThumb = this.renderThumb.bind(this);
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
    this.props.onScrollerRef(el);
  }

  render() {

    return (
      <Scrollbars
        thumbSize={ 120 }
        renderThumbVertical={ this.renderThumb }
        renderView={ this.renderView.bind(this) }
        ref={ this.handleScrollerRef.bind(this) }
        style={ this.props.style.container }
        { ...omit(this.props, ['onScrollerRef', 'style']) }
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
  style: PropTypes.object
};
