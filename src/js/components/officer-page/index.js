import React, { Component, PropTypes } from 'react';

import { pageWrapperStyle, radarChartPlaceholder } from './officer-page.style';
import SummarySection from './summary-section/index';
import MetricsSection from 'components/officer-page/metrics-section';


export default class OfficerPage extends Component {

  render() {
    const { officerSummary, openPoliceUnitPage, officerName } = this.props;
    return (
      <div>
        <div style={ pageWrapperStyle }>
          <div style={ radarChartPlaceholder }/>
          <SummarySection
            officerName={ officerName }
            officerSummary={ officerSummary }
            openPoliceUnitPage={ openPoliceUnitPage } />
        </div>
        <MetricsSection/>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  officerName: PropTypes.string,
  officerId: PropTypes.number,
  officerTimelineUrlParams: PropTypes.string,
  activeTab: PropTypes.string,
  pathname: PropTypes.string,
  query: PropTypes.object,
  scrollPosition: PropTypes.string,
  officerSummary: PropTypes.object,
  openPoliceUnitPage: PropTypes.func,
};

OfficerPage.defaultProps = {
  pathname: '/',
  scrollPosition: 'top',
  officerSummary: {},
};
