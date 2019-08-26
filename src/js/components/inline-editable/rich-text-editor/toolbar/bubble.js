import React, { Component, PropTypes } from 'react';

import { wrapperStyle, arrowStyle, arrowBorderStyle, outerWrapperStyle } from './bubble.style';


export default class Bubble extends Component {
  render() {
    const { children, onMouseOver, className, onMouseOut, style } = this.props;

    return (
      <div
        onMouseOver={ onMouseOver }
        className={ className }
        onMouseOut={ onMouseOut }
        style={ { ...outerWrapperStyle, ...style } }>
        <div style={ wrapperStyle }>
          <div style={ arrowBorderStyle } />
          <div style={ arrowStyle } />
          { children }
        </div>
      </div>
    );
  }
}

Bubble.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  children: PropTypes.node,
};
