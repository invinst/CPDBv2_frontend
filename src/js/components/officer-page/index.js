import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';

import { pageWrapperStyle, wrapperStyle } from './officer-page.style';
import OfficerRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class OfficerPage extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      officerName,
      currentTab,
      attachmentComplaintCount,
      mapMarkerCount,
      coaccusalCount
    } = this.props;
    return (
      officerName !== nextProps.officerName
      || currentTab !== nextProps.currentTab
      || attachmentComplaintCount !== nextProps.attachmentComplaintCount
      || mapMarkerCount !== nextProps.mapMarkerCount
      || coaccusalCount !== nextProps.coaccusalCount
    );
  }

  render() {
    const {
      officerSummary,
      openPoliceUnitPage,
      officerMetrics,
      officerName,
      threeCornerPercentile,
      changeOfficerTab,
      currentTab,
      attachmentComplaintCount,
      mapMarkerCount,
      coaccusalCount,
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
            attachmentComplaintCount={ attachmentComplaintCount }
            mapMarkerCount={ mapMarkerCount }
            coaccusalCount={ coaccusalCount }
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
  attachmentComplaintCount: PropTypes.number,
  mapMarkerCount: PropTypes.number,
  coaccusalCount: PropTypes.number,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {}
};
