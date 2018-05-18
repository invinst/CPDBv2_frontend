import React, { Component, PropTypes } from 'react';

import {
  containerStyle,
  headerStyle,
  tableHeaderStyle,
  tableHeaderItemStyle,
  tableContentStyle,
  subTextStyle,
  radarStyle,
  cellStyle,
} from './percentiles-by-year.style';
import StaticRadarChart from 'components/common/radar-chart';
import { roundedPercentile } from 'utils/calculations';


export default class PercentilesByYear extends Component {
  render() {
    const { yearlyRadarChartData } = this.props;

    const radarConfig = {
      hideAxisText: true,
      showGrid: false,
      showSpineLine: false,
    };

    return (
      <div style={ containerStyle } className='test--percentile-by-year'>
        <h4 style={ headerStyle }>CUMULATIVE PERCENTILES BY YEAR</h4>
        <div style={ tableHeaderStyle }>
          <div style={ tableHeaderItemStyle }>Internal Complaints</div>
          <div style={ tableHeaderItemStyle }>Civilian Complaints</div>
          <div style={ tableHeaderItemStyle }>Use Of Force</div>
        </div>
        <ul style={ tableContentStyle }>
          { yearlyRadarChartData && yearlyRadarChartData.map((yearlyItem) => (
            <li className='test--radar-explainer-percentiles-row' key={ yearlyItem.year }>
              <div style={ radarStyle }>
                <StaticRadarChart
                  { ...radarConfig }
                  backgroundColor={ yearlyItem.visualTokenBackground }
                  data={ yearlyItem.items }
                />
              </div>
              <div style={ subTextStyle }>{ yearlyItem.year }</div>
              <div style={ cellStyle }>{ roundedPercentile(yearlyItem.items[1].value) }</div>
              <div style={ cellStyle }>{ roundedPercentile(yearlyItem.items[2].value) }</div>
              <div style={ cellStyle }>{ roundedPercentile(yearlyItem.items[0].value) }</div>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

PercentilesByYear.propTypes = {
  yearlyRadarChartData: PropTypes.arrayOf(
    PropTypes.shape({
      visualTokenBackground: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        axis: PropTypes.string,
        value: PropTypes.number,
      })),
      year: PropTypes.number,
    })
  )
};
