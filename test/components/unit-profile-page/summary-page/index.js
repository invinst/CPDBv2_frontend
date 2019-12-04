import React from 'react';
import { shallow } from 'enzyme';

import MemberAggregateSection from 'components/unit-profile-page/summary-page/member-aggregate-section';
import ComplaintAggregateSection from 'components/unit-profile-page/summary-page/complaint-aggregate-section';
import SummaryPage from 'components/unit-profile-page/summary-page';


describe('SummaryPage component', function () {
  it('should render MemberAggregateSection and ComplaintAggregateSection', function () {
    const wrapper = shallow(<SummaryPage />);
    wrapper.find(MemberAggregateSection).exists().should.be.true();
    wrapper.find(ComplaintAggregateSection).exists().should.be.true();
  });
});
