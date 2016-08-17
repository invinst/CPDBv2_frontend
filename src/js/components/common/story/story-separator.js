import React, { Component } from 'react';

import { divideLineStyle } from './story-separator.style';


export default class StorySeparator extends Component {
  render() {
    return (
      <div style={ divideLineStyle }/>
    );
  }
}
