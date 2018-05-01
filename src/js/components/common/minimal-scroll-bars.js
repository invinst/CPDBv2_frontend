import React, { PropTypes, Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { omit } from 'lodash';

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

  handleScrollerRef(el) {
    this.props.onScrollerRef(el);
  }

  render() {

    return (
      <Scrollbars
        thumbSize={ 120 }
        renderThumbVertical={ this.renderThumb }
        ref={ this.handleScrollerRef.bind(this) }
        { ...omit(this.props, 'onScrollerRef') }
      />
    );
  }
}

MinimalScrollBars.defaultProps = {
  onScrollerRef: () => {}
};

MinimalScrollBars.propTypes = {
  onScrollerRef: PropTypes.func
};
