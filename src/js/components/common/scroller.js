import React, { PropTypes, Component } from 'react';

import { wrapperStyle } from './scroller.style';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';


export default class Scroller extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop !== this.props.scrollTop) {
      this.element.scrollTop(nextProps.scrollTop);
    }
    if (nextProps.scrollLeft !== this.props.scrollLeft) {
      this.element.scrollLeft(nextProps.scrollLeft);
    }
  }

  handleElementRef(el) {
    if (el) {
      this.element = el;
      this.props.onScrollerRef(el);
    }
  }

  render() {
    const { style, children } = this.props;
    return (
      <MinimalScrollBars
        style={ { ...wrapperStyle, ...style } }
        onScrollerRef={ this.handleElementRef.bind(this) }>
        { children }
      </MinimalScrollBars>
    );
  }
}

Scroller.defaultProps = {
  onScrollerRef: () => {}
};

Scroller.propTypes = {
  scrollTop: PropTypes.number,
  scrollLeft: PropTypes.number,
  style: PropTypes.object,
  children: PropTypes.node,
  onScrollerRef: PropTypes.func
};
