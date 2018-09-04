import React, { Component, PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import { compact, get, isEmpty } from 'lodash';

import { pageWrapperStyle, wrapperStyle } from './officer-page.style';
import OfficerRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import { POPUP_NAMES } from 'utils/constants';


export default class OfficerPage extends Component {

  componentWillReceiveProps(nextProps) {
    const { officerId, pathName, officerSlug } = nextProps;
    const correctPathName = `/officer/${officerId}/${officerSlug}/`;
    if (!isEmpty(officerSlug) && pathName.match(/\/officer\/\d+\/[\-a-z]+\/?$/) && pathName !== correctPathName) {
      window.history.replaceState(window.history.state, document.title, correctPathName);
    }
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
      hasComplaint,
      hasMapMarker,
      hasCoaccusal,
      popup,
      isRequesting,
      triangleEditWrapperStateProps,
      scaleEditWrapperStateProps,
      noDataRadarChartEditWrapperStateProps,
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
            <OfficerRadarChart
              data={ threeCornerPercentile }
              isRequesting={ isRequesting }
              triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
              scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
              noDataRadarChartEditWrapperStateProps={ noDataRadarChartEditWrapperStateProps }
              noDataPopup={ get(popup, POPUP_NAMES.OFFICER.NO_DATA_RADAR_CHART) }
            />
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
  isRequesting: PropTypes.bool,
  popup: PropTypes.object,
  triangleEditWrapperStateProps: PropTypes.object,
  scaleEditWrapperStateProps: PropTypes.object,
  noDataRadarChartEditWrapperStateProps: PropTypes.object,
  pathName: PropTypes.string,
  officerSlug: PropTypes.string,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {},
  pathName: '',
};
