import PropTypes from 'prop-types';
import React from 'react';

import { wrapperStyle, labelStyle, contentStyle } from './row.style';


export default function Row(props) {
  const { label, content, hasBorderBottom, labelWidth, contentWidth, hovering } = props;

  return (
    <div style={ wrapperStyle(hasBorderBottom) }>
      <span
        className='test--row-label'
        style={ labelStyle(labelWidth, hovering) }
      >
        { label }
      </span>
      <span
        className='test--row-content'
        style={ contentStyle(contentWidth, hovering) }
      >
        { content }
      </span>
    </div>
  );
}

Row.propTypes = {
  label: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasBorderBottom: PropTypes.bool,
  labelWidth: PropTypes.number,
  contentWidth: PropTypes.number,
  hovering: PropTypes.bool,
};

Row.defaultProps = {
  hasBorderBottom: true,
  labelWidth: 175,
  hovering: false,
};
