import React, { Component } from 'react';

import { loadingIndicatorStyle } from './loading-indicator.style.js';


export default class LoadingIndicator extends Component {
  render() {
    return <div className='fa fa-spinner fa-pulse' style={ loadingIndicatorStyle }></div>;
  }
}
