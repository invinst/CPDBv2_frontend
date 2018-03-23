import React, { Component, PropTypes } from 'react';

import { wrapperStyle } from './summary-page.style.js';
import { pageWrapperStyle, radarChartPlaceholderStyle } from './summary-page.style';
import OfficerRadarChart from './radar-chart';
import SummarySection from './summary-section/index';
import MetricsSection from './metrics-section';
import BiographySection from './biography-section';


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
      newTimelineItems,
      threeCornerPercentile
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
        <BiographySection timelineItems={ newTimelineItems }/>
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
  newTimelineItems: PropTypes.array,
  fetchPercentile: PropTypes.func
};

SummaryPage.defaultProps = {
  newTimelineItems: [],
};
