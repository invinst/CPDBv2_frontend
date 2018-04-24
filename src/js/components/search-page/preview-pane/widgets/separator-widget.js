import React, { Component } from 'react';

import { whiteTwoColor } from 'utils/styles';


export default class SeparatorWidget extends Component {
  render() {
    return (
      <div style={ styles.container }>
        <div style={ styles.hr }/>
      </div>
    );
  }
}

const styles = {
  container: {
    height: '1px',
    margin: '0 -8px',
    backgroundColor: 'white',
  },
  hr: {
    background: whiteTwoColor,
    margin: '0 16px',
    height: '1px',
  }
};
