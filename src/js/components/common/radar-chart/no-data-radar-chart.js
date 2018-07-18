import React, { Component, PropTypes } from 'react';

import { noDataRadarStyle, noDataRadarTextStyle } from './no-data-radar-chart.style';
import { boulderColor, clayGray, greyishColor } from 'utils/styles';
import RadarChart from './radar-chart';


export default class NoDataRadarChart extends Component {
  render() {
    const { width, height, radius, noDataText } = this.props;

    return (
      <div
        className='test--no-data-radar-chart'
        style={ noDataRadarStyle }
      >
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
        {
          noDataText ? (
            <div className='test--no-data-text' style={ noDataRadarTextStyle }>
              { noDataText }
            </div>
          ) : null
        }
      </div>
    );
  }
}

NoDataRadarChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  radius: PropTypes.number,
  noDataText: PropTypes.string,
};
