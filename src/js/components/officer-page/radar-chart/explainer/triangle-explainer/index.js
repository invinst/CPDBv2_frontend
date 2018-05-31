import React, { Component, PropTypes } from 'react';

import {
  containerStyle, explainerContainerStyle, radarContainerStyle, subTextStyle, titleTextStyle, textStyle
} from './triangle-explainer.style';
import StaticRadarChart from 'components/common/radar-chart';

import { sugarCaneColor, whiteTwoColor } from 'utils/styles';


export default class TriangleExplainer extends Component {
  render() {
    const radarConfig = {
      backgroundColor: sugarCaneColor,
      showGrid: true,
      gridColor: whiteTwoColor,
      showSpineLine: false,
    };

    return (
      <div style={ containerStyle } className='test--triangle-explainer'>
        <div style={ radarContainerStyle }>
          <StaticRadarChart { ...radarConfig } data={ this.props.radarChartData }/>
        </div>
        <div style={ explainerContainerStyle }>
          <h5 style={ titleTextStyle }>What is this triangle?</h5>
          <p style={ textStyle }>
            The triangle shows the percentile rank for this officer in each of three types of data:
            complaints from civilians, complaints from other police officers, and self-reported uses of force.
          </p>
          <p style={ subTextStyle }>
            If one corner of the inner triangle is close to reaching the outer triangle,
            then this officer is named in a relatively high rate of incidents of that type.
          </p>
        </div>
      </div>
    );
  }
}

TriangleExplainer.propTypes = {
  radarChartData: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  )
};
