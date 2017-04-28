import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import SummarySection from './summary-section';
import AggregateSection from './aggregate-section';


export default class SummaryPage extends Component {
  componentWillMount() {
    const { fetchOfficerSummary, officerId } = this.props;
    fetchOfficerSummary(officerId);
  }

  render() {
    const { officerSummary, complaintsCount, sustainedCount, complaintFacets } = this.props;

    return (
      <ResponsiveFixedWidthComponent>
        <SummarySection officerSummary={ officerSummary }/>
        <AggregateSection
          title='COMPLAINT RECORDS' fadedTitle='CRs' count={ complaintsCount } sustainedCount={ sustainedCount }
          aggregateFacets={ complaintFacets }/>
      </ResponsiveFixedWidthComponent>
    );
  }
}

SummaryPage.propTypes = {
  officerSummary: PropTypes.object,
  complaintsCount: PropTypes.number,
  complaintFacets: PropTypes.array,
  sustainedCount: PropTypes.number,
  fetchOfficerSummary: PropTypes.func,
  officerId: PropTypes.number
};
