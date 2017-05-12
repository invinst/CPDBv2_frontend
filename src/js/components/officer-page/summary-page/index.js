import React, { Component, PropTypes } from 'react';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import SummarySection from './summary-section';
import AggregateSection from './aggregate-section';
import { wrapperStyle } from './summary-page.style.js';


export default class SummaryPage extends Component {
  render() {
    const { officerSummary, complaintsCount, sustainedCount, complaintFacets } = this.props;

    return (
      <div style={ wrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <SummarySection officerSummary={ officerSummary }/>
          <AggregateSection
            title='COMPLAINT RECORDS' fadedTitle='CRs' count={ complaintsCount } sustainedCount={ sustainedCount }
            aggregateFacets={ complaintFacets }/>
        </ResponsiveFixedWidthComponent>
      </div>
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
