import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';

import { lineStyle, svgStyle } from './checkmark.style';
import { defaultConfig } from 'utils/spring-presets';


export default class CheckMark extends Component {
  render() {
    const defaultStyle = {
      strokeDashoffset: 30
    };
    const motionStyle = {
      strokeDashoffset: spring(2, defaultConfig())
    };
    const { style } = this.props;

    return (
      <Motion
        defaultStyle={ defaultStyle }
        style={ motionStyle }>
        {
          ({ strokeDashoffset }) => (
            <svg className='test--check-mark' viewBox='15 15 40 40' style={ { ...svgStyle, ...style } }>
              <path
                d='m31.5,46.5l15.3,-23.2'
                style={ { ...lineStyle, strokeDashoffset } }/>
              <path
                d='m31.5,46.5l-8.5,-7.1'
                style={ { ...lineStyle, strokeDashoffset } }/>
            </svg>
          )
        }
      </Motion>
    );
  }
}

CheckMark.propTypes = {
  style: PropTypes.object
};
