import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import SummarySection from './summary-section';
import AggregateSection from './aggregate-section';


export default class SummaryPage extends Component {
  constructor(props) {
    super(props);

    const { fetchOfficerSummary, officerId } = props;
    fetchOfficerSummary(officerId);
  }

  render() {
    const { officerSummary, complaintsCount, complaintFacets } = this.props;

    return (
      <ResponsiveFixedWidthComponent>
        <SummarySection officerSummary={ officerSummary }/>
        <AggregateSection
          title='COMPLAINT RECORDS' fadedTitle='CRs' count={ complaintsCount } aggregateFacets={ complaintFacets }/>
      </ResponsiveFixedWidthComponent>
    );
  }
}

SummaryPage.propTypes = {
  officerSummary: PropTypes.object,
  complaintsCount: PropTypes.number,
  complaintFacets: PropTypes.object,
  fetchOfficerSummary: PropTypes.func,
  officerId: PropTypes.number
};
