import React, { Component, PropTypes } from 'react';

import { pageWrapperStyle, radarChartPlaceholderStyle, wrapperStyle } from './officer-page.style';
import OfficerRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';


export default class OfficerPage extends Component {
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

OfficerPage.propTypes = {
  officerId: PropTypes.number,
  officerName: PropTypes.string,
  officerSummary: PropTypes.object,
  officerMetrics: PropTypes.object,
  threeCornerPercentile: PropTypes.array,
  openPoliceUnitPage: PropTypes.func,
};
