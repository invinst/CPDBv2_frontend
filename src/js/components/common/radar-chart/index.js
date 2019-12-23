import PropTypes from 'prop-types';
import React from 'react';

import RadarChart from './radar-chart';
import { hasEnoughRadarChartData } from 'utils/radar-chart';
import { clayGray, greyishColor, softBlackColor, sugarCaneColor } from 'utils/styles';


const PRINT_RADAR_CHART_STYLES = {
  textColor: softBlackColor,
  backgroundColor: sugarCaneColor,
  gridColor: softBlackColor,
  boundaryAreaColor: sugarCaneColor,
  gridOpacity: 0.5,
  strokeWidth: 0,
  radarMainAreaOpacity: 0.4,
};

export default function StaticRadarChart(props, context) {
  const { data, width, height, radius, offsetTop } = props;

  const { printMode } = context;
  const radarChartPrintStyle = printMode ? PRINT_RADAR_CHART_STYLES : {};

  if (!hasEnoughRadarChartData(data)) {
    return (
      <RadarChart
        numMetrics={ 3 }
        width={ width }
        height={ height }
        radius={ radius }
        backgroundColor={ greyishColor }
        showGrid={ true }
        outerGridOnly={ true }
        gridColor={ clayGray }
        strokeWidth={ 0.6 }
        boundaryAreaColor={ greyishColor }
        offsetTop={ offsetTop }
        { ...radarChartPrintStyle }
      />
    );
  }

  return <RadarChart{ ...props } { ...radarChartPrintStyle }/>;
}


StaticRadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  showAxisTitle: PropTypes.bool,
  showAxisValue: PropTypes.bool,
  showValueWithSuffix: PropTypes.bool,
  axisTitleFontSize: PropTypes.number,
  axisTitleFontWeight: PropTypes.number,
  showGrid: PropTypes.bool,
  gridOpacity: PropTypes.number,
  gridColor: PropTypes.string,
  showSpineLine: PropTypes.bool,
  showSpineLinePoint: PropTypes.bool,
  legendText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.element,
  ]),
  fadeOutLegend: PropTypes.bool,
  offsetTop: PropTypes.number,
};

StaticRadarChart.contextTypes = {
  printMode: PropTypes.bool,
};
