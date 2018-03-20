import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

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

  render() {
    return (
      <Scrollbars
        thumbSize={ 120 }
        renderThumbVertical={ this.renderThumb }
        { ...this.props }
      />
    );
  }
}
