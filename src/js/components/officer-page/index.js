import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { compact } from 'lodash';

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
      popup,
    } = this.props;

    const pageTitle = compact([
      officerSummary.rank === 'N/A' ? '' : officerSummary.rank,
      officerName
    ]).join(' ');

    return (
      <DocumentTitle title={ pageTitle }>
        <div style={ wrapperStyle } className='officer-page'>
          <ShareableHeaderContainer />
          <div style={ pageWrapperStyle }>
            <OfficerRadarChart data={ threeCornerPercentile } />
            <SummarySection
              officerName={ officerName }
              officerSummary={ officerSummary }
              openPoliceUnitPage={ openPoliceUnitPage }
              popup={ popup }
            />
          </div>
          <MetricsSection metrics={ officerMetrics } popup={ popup }/>
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
  popup: PropTypes.object,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {}
};
