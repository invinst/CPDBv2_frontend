import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { wrapperStyle } from './scroller.style';


export default class Scroller extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop !== this.props.scrollTop) {
      this.element.scrollTop = nextProps.scrollTop;
    }
    if (nextProps.scrollLeft !== this.props.scrollLeft) {
      this.element.scrollLeft = nextProps.scrollLeft;
    }
  }

  handleElementRef(el) {
    if (el) {
      this.element = el;
      this.props.onElementRef(el);
    }
  }

  render() {
    const { style, children } = this.props;
    return (
      <div style={ { ...wrapperStyle, ...style } } ref={ this.handleElementRef.bind(this) }>
        { children }
      </div>
    );
  }
}

Scroller.propTypes = {
  scrollTop: PropTypes.number,
  scrollLeft: PropTypes.number,
  style: PropTypes.object,
  onElementRef: PropTypes.func,
  children: PropTypes.node,
};

Scroller.defaultProps = {
  onElementRef: () => {},
};
