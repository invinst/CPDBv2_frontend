import React, { Component, PropTypes } from 'react';

import { wrapperStyle, arrowStyle, arrowBorderStyle, outerWrapperStyle } from './bubble.style';


export default class Bubble extends Component {
  render() {
    const { children, style } = this.props;

    return (
      <div style={ { ...outerWrapperStyle, ...style } }>
        <div style={ wrapperStyle }>
          <div style={ arrowBorderStyle }> </div>
          <div style={ arrowStyle }> </div>
          { children }
        </div>
      </div>
    );
  }
}

Bubble.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node
};
