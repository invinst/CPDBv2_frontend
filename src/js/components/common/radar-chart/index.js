import React, { Component, PropTypes } from 'react';

import RadarChart from './radar-chart';
import NoDataRadarChart from './no-data-radar-chart';
import { hasEnoughRadarChartData } from 'utils/radar-chart';


export default class StaticRadarChart extends Component {
  render() {
    const { data, width, height, radius } = this.props;

    if (!hasEnoughRadarChartData(data)) {
      const noDataProps = { width, height, radius };
      return <NoDataRadarChart { ...noDataProps }/>;
    }

    return <RadarChart{ ...this.props }/>;
  }
}


StaticRadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      axis: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
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
    PropTypes.element
  ]),
  fadeOutLegend: PropTypes.bool,
};

