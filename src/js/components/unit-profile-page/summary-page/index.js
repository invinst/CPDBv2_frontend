import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import MemberAggregateSection from './member-aggregate-section';
import ComplaintAggregateSection from './complaint-aggregate-section';
import { wrapperStyle } from './summary-page.style.js';


export default class SummaryPage extends Component {
  componentDidMount() {
    const { unitName, fetchUnitProfileSummary } = this.props;
    fetchUnitProfileSummary(unitName);
  }

  render() {
    const {
      activeMembers, totalMembers, memberFacets, complaintCount, sustainedComplaintCount, complaintFacets
    } = this.props;
    return (
      <ResponsiveFluidWidthComponent>
        <div style={ wrapperStyle }>
          <MemberAggregateSection activeMembers={ activeMembers } totalMembers={ totalMembers }
            memberFacets={ memberFacets }/>
          <ComplaintAggregateSection count={ complaintCount }
            sustainedCount={ sustainedComplaintCount } facets={ complaintFacets }/>
        </div>
      </ResponsiveFluidWidthComponent>
    );
  }
}

SummaryPage.propTypes = {
  unitName: PropTypes.string,
  activeMembers: PropTypes.number,
  totalMembers: PropTypes.number,
  memberFacets: PropTypes.array,
  complaintCount: PropTypes.number,
  sustainedComplaintCount: PropTypes.number,
  complaintFacets: PropTypes.array,
  fetchUnitProfileSummary: PropTypes.func
};

SummaryPage.defaultProps = {
  fetchUnitProfileSummary: () => {}
};
