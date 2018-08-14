import React, { Component, PropTypes } from 'react';

import RadarChart from './radar-chart';
import { hasEnoughRadarChartData } from 'utils/radar-chart';
import { boulderColor, clayGray, greyishColor } from 'utils/styles';


export default class StaticRadarChart extends Component {
  render() {
    const { data, width, height, radius } = this.props;

    if (!hasEnoughRadarChartData(data)) {
      return (
        <RadarChart
          numMetrics={ 3 }
          width={ width }
          height={ height }
          radius={ radius }
          backgroundColor={ boulderColor }
          showGrid={ true }
          gridColor={ clayGray }
          boundaryAreaColor={ greyishColor }
        />
      );
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

