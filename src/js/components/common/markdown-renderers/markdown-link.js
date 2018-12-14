import React, { Component } from 'react';

import style from './markdown-link.sass';


export default class MarkdownLink extends Component {
  render() {
    return (
      <a className={ style.markdownLink } { ...this.props } />
    );
  }
}
