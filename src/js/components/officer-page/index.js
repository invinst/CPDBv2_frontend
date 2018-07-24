import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import { pageWrapperStyle, wrapperStyle } from './officer-page.style';
import OfficerRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class OfficerPage extends Component {
  render() {
    const {
      officerSummary,
      openPoliceUnitPage,
      officerMetrics,
      officerName,
      threeCornerPercentile,
      changeOfficerTab,
      currentTab,
      hasComplaint,
      hasMapMarker,
      hasCoaccusal,
    } = this.props;
    return (
      <DocumentTitle title={ `${officerSummary.rank} ${officerName}` }>
        <div style={ wrapperStyle } className='officer-page'>
          <ShareableHeaderContainer />
          <div style={ pageWrapperStyle }>
            <OfficerRadarChart data={ threeCornerPercentile } />
            <SummarySection
              officerName={ officerName }
              officerSummary={ officerSummary }
              openPoliceUnitPage={ openPoliceUnitPage } />
          </div>
          <MetricsSection metrics={ officerMetrics } />
          <TabbedPaneSection
            changeOfficerTab={ changeOfficerTab }
            currentTab={ currentTab }
            hasComplaint={ hasComplaint }
            hasMapMarker={ hasMapMarker }
            hasCoaccusal={ hasCoaccusal }
          />
        </div>
      </DocumentTitle>
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
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
  hasMapMarker: PropTypes.bool,
  hasCoaccusal: PropTypes.bool,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {}
};
