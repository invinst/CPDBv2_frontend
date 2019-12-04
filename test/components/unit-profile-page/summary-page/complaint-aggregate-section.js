import React from 'react';
import { shallow } from 'enzyme';

import AggregateFacet from 'components/unit-profile-page/summary-page/aggregate-facet';
import ComplaintAggregateSection from 'components/unit-profile-page/summary-page/complaint-aggregate-section';


describe('ComplaintAggregateSection component', function () {
  it('should render the name and count of all entries', function () {
    const facets = [{
      name: 'facet',
      entries: [{ name: 'foo', count: 1, sustainedCount: 0 }],
    }];
    const wrapper = shallow(
      <ComplaintAggregateSection facets={ facets }/>
    );
    wrapper.find(AggregateFacet).should.have.length(1);
  });
});
