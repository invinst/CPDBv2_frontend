import React, { Component, PropTypes } from 'react';

import { wrapperStyle } from './summary-page.style.js';
import { pageWrapperStyle, radarChartPlaceholderStyle } from './summary-page.style';
import OfficerRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import BiographySection from './biography-section';
import { changeFilter } from 'actions/officer-page/new-timeline';


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
      threeCornerPercentile,
      changeFilter,
      selectedFilter,
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
        <BiographySection
          timelineItems={ newTimelineItems }
          changeFilter={ changeFilter }
          selectedFilter={ selectedFilter }/>
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
  fetchPercentile: PropTypes.func,
  changeFilter: PropTypes.func,
  selectedFilter: PropTypes.string,
};

SummaryPage.defaultProps = {
  newTimelineItems: [],
};
