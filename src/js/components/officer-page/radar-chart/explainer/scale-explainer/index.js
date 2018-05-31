import React, { Component, PropTypes } from 'react';

import StaticRadarChart from 'components/common/radar-chart';
import {
  containerStyle, explainerContainerStyle, radarContainerStyle, subTextStyle, titleTextStyle, textStyle, legendStyle
} from './scale-explainer.style';
import { sugarCaneColor, whiteTwoColor } from 'utils/styles';


export default class ScaleExplainer extends Component {
  render() {
    const { radarChartData, year } = this.props;
    const radarConfig = {
      showValueInsteadOfTitle: true,
      backgroundColor: sugarCaneColor,
      showGrid: true,
      gridColor: whiteTwoColor,
      showSpineLine: false,
      showAxisValue: true,
      axisTitleFontSize: 28,
      axisTitleFontWeight: 500,
    };

    return (
      <div style={ containerStyle } className='test--scale-explainer'>
        <div style={ radarContainerStyle }>
          <StaticRadarChart
            { ...radarConfig }
            data={ radarChartData }
          />
          <div style={ legendStyle }>{ year }</div>
        </div>
        <div style={ explainerContainerStyle }>
          <h5 style={ titleTextStyle }>What is the scale?</h5>
          <p style={ textStyle }>
            The scale is based on this officer’s percentile rank.
            This is relative to all other officers for whom data is available during the same years.
          </p>
          <p style={ subTextStyle }>
            If an officer’s percentile rank for civilian complaints is 99%
            then this means that they were accused in more civilian complaints per year than 99 % of other officers
            for whom data is available during the same years.
          </p>
        </div>
      </div>
    );
  }
}

ScaleExplainer.propTypes = {
  radarChartData: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ),
  year: PropTypes.number,
};
