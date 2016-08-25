import React, { Component, PropTypes } from 'react';

import { errorStyle } from './error-text.style';


export default class ErrorText extends Component {
  render() {
    const { children, style } = this.props;
    return (
      <span style={ { ...errorStyle, ...style } }>{ children }</span>
    );
  }
}

ErrorText.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};
