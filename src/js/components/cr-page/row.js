import React, { Component, PropTypes } from 'react';

import { wrapperStyle, labelStyle, contentStyle } from './row.style';


export default class Row extends Component {
  render() {
    const { label, content } = this.props;
    return (
      <div style={ wrapperStyle }>
        <span style={ labelStyle }>{ label }</span>
        <span style={ contentStyle }>{ content }</span>
      </div>
    );
  }
}

Row.propTypes = {
  label: PropTypes.string,
  content: PropTypes.string
};
