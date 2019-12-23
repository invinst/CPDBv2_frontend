import PropTypes from 'prop-types';
import React from 'react';
import { Motion, spring } from 'react-motion';

import { svgStyle, pathStyle } from './crossmark.style';
import { defaultConfig } from 'utils/spring-presets';


export default function Crossmark(props) {
  const { style } = props;
  const defaultStyle = {
    strokeDashoffset: 13.1522,
  };

  const motionStyle = {
    strokeDashoffset: spring(2, defaultConfig()),
  };

  return (
    <Motion
      defaultStyle={ defaultStyle }
      style={ motionStyle }>
      {
        ({ strokeDashoffset }) => (
          <svg className='test--cross-mark' viewBox='15 15 40 40' style={ { ...svgStyle, ...style } }>
            <path d='m35,35l-9.3,-9.3' style={ { ...pathStyle, strokeDashoffset } }/>
            <path d='m35,35l9.3,9.3' style={ { ...pathStyle, strokeDashoffset } }/>
            <path d='m35,35l-9.3,9.3' style={ { ...pathStyle, strokeDashoffset } }/>
            <path d='m35,35l9.3,-9.3' style={ { ...pathStyle, strokeDashoffset } }/>
          </svg>
        )
      }
    </Motion>
  );
}

Crossmark.propTypes = {
  style: PropTypes.object,
};
