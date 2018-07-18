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
    const { officerName, currentTab } = this.props;
    return (
      officerName !== nextProps.officerName
      || currentTab !== nextProps.currentTab
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
      isRequesting
    } = this.props;
    return (
      <DocumentTitle title={ `${officerSummary.rank} ${officerName}` }>
        <div style={ wrapperStyle } className='officer-page'>
          <ShareableHeaderContainer/>
          <div style={ pageWrapperStyle }>
            <OfficerRadarChart data={ threeCornerPercentile } isRequesting={ isRequesting }/>
            <SummarySection
              officerName={ officerName }
              officerSummary={ officerSummary }
              openPoliceUnitPage={ openPoliceUnitPage }/>
          </div>
          <MetricsSection metrics={ officerMetrics }/>
          <TabbedPaneSection changeOfficerTab={ changeOfficerTab } currentTab={ currentTab }/>
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
  isRequesting: PropTypes.bool,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {}
};
