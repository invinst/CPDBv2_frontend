import React, { Component, PropTypes } from 'react';

import { wrapperStyle, titleStyle, contentStyle } from './text-widget.style';


export default class TextWidget extends Component {
  render() {
    return (
      <div className='test--text-widget' style={ wrapperStyle }>
        <p style={ titleStyle }>{ this.props.title }</p>
        <p style={ contentStyle }>{ this.props.content }</p>
      </div>
    );
  }
}

TextWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.content,
};