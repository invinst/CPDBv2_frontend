import React, { Component } from 'react';
import { containerStyle, buttonStyle, textStyle } from './view-widget.style';

export default class ViewWidget extends Component {
  render() {
    return (
      <div style={ containerStyle }>
        <span style={ textStyle }>View on the Data Tool</span>
        <a href='#' style={ buttonStyle }>→</a>
      </div>
    );
  }
}
