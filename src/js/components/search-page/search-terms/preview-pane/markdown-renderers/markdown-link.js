import React, { Component } from 'react';

export default class MarkdownLink extends Component {
  render() {
    const style = {
      textDecoration: 'none',
      color: 'blue',
    };

    return (
      <a style={ style } { ...this.props } />
    );
  }
}
