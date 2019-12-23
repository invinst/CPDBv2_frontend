import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MediaQuery from 'react-responsive';
import { includes } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import { roundedPercentile } from 'utils/calculations';
import styles from './percentiles-by-year.sass';


export default class PercentilesByYear extends Component {
  getItemValue(item) {
    const roundedValue = roundedPercentile(item.value);
    return includes([0, NaN], roundedValue) ? null : roundedValue;
  }

  render() {
    const { yearlyRadarChartData } = this.props;

    const radarConfig = {
      hideAxisText: true,
      showGrid: false,
      showSpineLine: false,
    };

    const data = yearlyRadarChartData ? [].concat(yearlyRadarChartData).reverse() : [];

    return (
      <div className={ styles.percentilesByYear }>
        <h4 className='percentiles-by-year-header'>CUMULATIVE PERCENTILES BY YEAR</h4>
        <div className='table-header'>
          <div className='table-header-item'>Internal Complaints</div>
          <div className='table-header-item'>Civilian Complaints</div>
          <div className='table-header-item'>Use Of Force <MediaQuery minWidth={ 890 }>Reports</MediaQuery></div>
        </div>
        <ul className='table-content'>
          { data && data.map((yearlyItem) => {
            const [trrItem, internalComplaintItem, civilComplaintItem] = yearlyItem.items;
            return (
              <li className='test--radar-explainer-percentiles-row' key={ yearlyItem.year }>
                <div className='percentiles-by-year-radar'>
                  <StaticRadarChart
                    { ...radarConfig }
                    backgroundColor={ yearlyItem.visualTokenBackground }
                    data={ yearlyItem.items }
                  />
                </div>
                <div className='percentiles-by-year-text'>{ yearlyItem.year }</div>
                <div className='percentiles-by-year-cell'>{ this.getItemValue(internalComplaintItem) }</div>
                <div className='percentiles-by-year-cell'>{ this.getItemValue(civilComplaintItem) }</div>
                <div className='percentiles-by-year-cell'>{ this.getItemValue(trrItem) }</div>
              </li>
            );
          }) }
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
  ),
};
