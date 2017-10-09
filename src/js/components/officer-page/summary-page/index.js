import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import SummarySection from './summary-section';
import AggregateSection from './aggregate-section';
import { wrapperStyle } from './summary-page.style.js';


export default class SummaryPage extends Component {
  render() {
    const {
      officerSummary, complaintsCount, sustainedCount, complaintFacets, openBottomSheetWithPoliceUnit
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <ResponsiveFluidWidthComponent>
          <SummarySection officerSummary={ officerSummary }
            openBottomSheetWithPoliceUnit={ openBottomSheetWithPoliceUnit } />
          <AggregateSection
            title='complaint records (CRs)' count={ complaintsCount } sustainedCount={ sustainedCount }
            aggregateFacets={ complaintFacets }/>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

SummaryPage.propTypes = {
  officerSummary: PropTypes.object,
  complaintsCount: PropTypes.number,
  complaintFacets: PropTypes.array,
  sustainedCount: PropTypes.number,
  officerId: PropTypes.number,
  openBottomSheetWithPoliceUnit: PropTypes.func
};
