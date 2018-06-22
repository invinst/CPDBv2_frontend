import React, { Component, PropTypes } from 'react';

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
      currentTab
    } = this.props;
    return (
      <div style={ wrapperStyle } className='officer-page'>
        <ShareableHeaderContainer/>
        <div style={ pageWrapperStyle }>
          <OfficerRadarChart data={ threeCornerPercentile }/>
          <SummarySection
            officerName={ officerName }
            officerSummary={ officerSummary }
            openPoliceUnitPage={ openPoliceUnitPage }/>
        </div>
        <MetricsSection metrics={ officerMetrics }/>
        <TabbedPaneSection changeOfficerTab={ changeOfficerTab } currentTab={ currentTab }/>
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
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
};
