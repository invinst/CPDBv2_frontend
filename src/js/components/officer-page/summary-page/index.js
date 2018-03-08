import React, { Component, PropTypes } from 'react';

import { wrapperStyle } from './summary-page.style.js';
import { pageWrapperStyle, radarChartPlaceholderStyle } from './summary-page.style';
import SummarySection from './summary-section/index';
import MetricsSection from './metrics-section';


export default class SummaryPage extends Component {
  render() {
    const {
      officerSummary,
      openPoliceUnitPage,
      officerMetrics,
      officerName,
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ pageWrapperStyle }>
          <div style={ radarChartPlaceholderStyle }/>
          <SummarySection
            officerName={ officerName }
            officerSummary={ officerSummary }
            openPoliceUnitPage={ openPoliceUnitPage } />
        </div>
        <MetricsSection metrics={ officerMetrics }/>
      </div>
    );
  }
}

SummaryPage.propTypes = {
  officerName: PropTypes.string,
  officerSummary: PropTypes.object,
  officerMetrics: PropTypes.object,
  openPoliceUnitPage: PropTypes.func,
};
