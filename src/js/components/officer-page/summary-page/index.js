import React, { Component, PropTypes } from 'react';

import { wrapperStyle } from './summary-page.style.js';
import { pageWrapperStyle, radarChartPlaceholderStyle } from './summary-page.style';
import OfficerRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';


export default class SummaryPage extends Component {
  componentDidMount() {
    const { fetchPercentile, officerId } = this.props;
    fetchPercentile && fetchPercentile(officerId);
  }

  render() {
    const {
      officerSummary,
      openPoliceUnitPage,
      officerMetrics,
      officerName,
      threeCornerPercentile,
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <div style={ pageWrapperStyle }>

          <div className='test--officer--radar-chart' style={ radarChartPlaceholderStyle }>
            <OfficerRadarChart data={ threeCornerPercentile }/>
          </div>

          <SummarySection
            officerName={ officerName }
            officerSummary={ officerSummary }
            openPoliceUnitPage={ openPoliceUnitPage }/>
        </div>
        <MetricsSection metrics={ officerMetrics }/>
        <TabbedPaneSection/>
      </div>
    );
  }
}

SummaryPage.propTypes = {
  officerId: PropTypes.number,
  officerName: PropTypes.string,
  threeCornerPercentile: PropTypes.array,
  officerSummary: PropTypes.object,
  officerMetrics: PropTypes.object,
  openPoliceUnitPage: PropTypes.func,
  fetchPercentile: PropTypes.func,
};
