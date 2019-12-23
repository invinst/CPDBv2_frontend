import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { omit } from 'lodash';

import { thumbStyle } from './minimal-srcoll-bar.style';


export default class MinimalScrollBars extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop !== this.props.scrollTop) {
      this.scrollerRef.scrollTop(nextProps.scrollTop);
    }
    if (nextProps.scrollLeft !== this.props.scrollLeft) {
      this.scrollerRef.scrollLeft(nextProps.scrollLeft);
    }
  }

  renderThumb = ({ style, ...props }) => {
    return (
      <div className='test--minimal-scrollbars-vertical-thumb' style={ { ...style, ...thumbStyle } } { ...props } />
    );
  };

  renderView = ({ style }) => {
    const { viewClassName } = this.props;
    return (
      <div
        style={ { ...style, ...this.props.style.view } }
        className={ viewClassName }
      />
    );
  };

  handleScrollerRef = (el) => {
    this.scrollerRef = el;
    this.props.onScrollerRef(el);
  };

  render() {
    const { showThumb } = this.props;
    const rest = omit(
      this.props,
      ['onScrollerRef', 'style', 'scrollTop', 'scrollLeft', 'showThumb', 'viewClassName']
    );
    return (
      <Scrollbars
        thumbSize={ 120 }
        renderThumbVertical={ showThumb ? this.renderThumb: () => <div/> }
        renderView={ this.renderView }
        ref={ this.handleScrollerRef }
        style={ this.props.style.container }
        renderTrackHorizontal={
          props => <div { ...props } style={ { display: 'none' } } className='track-horizontal' />
        }
        { ...rest }
      />
    );
  }
}

MinimalScrollBars.defaultProps = {
  onScrollerRef: () => {},
  style: {},
  showThumb: true,
};

MinimalScrollBars.propTypes = {
  onScrollerRef: PropTypes.func,
  style: PropTypes.object,
  scrollTop: PropTypes.number,
  scrollLeft: PropTypes.number,
  viewClassName: PropTypes.string,
};
