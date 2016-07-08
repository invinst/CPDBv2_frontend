import React, { Component } from 'react';


export default class LoadingIndicator extends Component {
  render() {
    return <div style={ { position: 'absolute', height: '100px' } }>Loading...</div>;
  }
}
