import PropTypes from 'prop-types';
import React from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import MemberAggregateSection from './member-aggregate-section';
import ComplaintAggregateSection from './complaint-aggregate-section';
import { wrapperStyle } from './summary-page.style.js';


export default function SummaryPage(props) {
  const {
    activeMembers, totalMembers, memberFacets, complaintCount, sustainedComplaintCount, complaintFacets,
  } = props;
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

SummaryPage.propTypes = {
  unitName: PropTypes.string,
  activeMembers: PropTypes.number,
  totalMembers: PropTypes.number,
  memberFacets: PropTypes.array,
  complaintCount: PropTypes.number,
  sustainedComplaintCount: PropTypes.number,
  complaintFacets: PropTypes.array,
};
