import PropTypes from 'prop-types';
import React from 'react';

import { wrapperStyle, titleStyle, contentStyle } from './text-widget.style';


export default function TextWidget(props) {
  const { content, title } = props;
  return !!(content) && (
    <div className='test--text-widget' style={ wrapperStyle }>
      <p style={ titleStyle }>{ title }</p>
      <p style={ contentStyle }>{ content }</p>
    </div>
  );
}

TextWidget.defaultProps = {
  content: null,
};

TextWidget.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
};
