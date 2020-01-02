import React from 'react';
import { shallow } from 'enzyme';

import AggregateFacet from 'components/unit-profile-page/summary-page/aggregate-facet';


describe('AggregateFacet component', function () {
  it('should render the name and count of all entries', function () {
    const name = 'name';
    const entries = [
      { name: 'foo', count: 1, sustainedCount: 0 },
      { name: 'bar', count: 2, sustainedCount: 1 },
    ];
    const wrapper = shallow(
      <AggregateFacet name={ name } entries={ entries }/>
    );

    wrapper.find('.test--entry-count').should.have.length(2);
    wrapper.find('.test--entry-sustained-count').should.have.length(2);
    wrapper.find('.test--entry-name').should.have.length(2);
  });
});
