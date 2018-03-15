import React, { Component, PropTypes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import { thumbStyle } from 'components/search-page/search-terms/minimal-srcoll-bar.style';


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
        style={ this.props.style }
        children={ this.props.children }
      />
    );
  }
}

MinimalScrollBars.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node,
};
