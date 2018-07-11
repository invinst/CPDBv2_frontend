import React, { Component } from 'react';
import Tooltip from 'tooltip.js';

import { wrapperStyle, innerStyle } from './popup.style';


export default class Index extends Component {
  render() {
    return (
      <div style={ wrapperStyle }>
        <span style={ innerStyle }>i</span>
      </div>
    );
  }
}
