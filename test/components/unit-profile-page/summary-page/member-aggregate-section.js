import React from 'react';
import { shallow } from 'enzyme';

import MemberAggregateSection from 'components/unit-profile-page/summary-page/member-aggregate-section';


describe('MemberAggregateSection component', function () {
  it('should render races, ages and genders', function () {
    const activeMembers = 1;
    const totalMembers = 1;
    const memberFacets = [
      { name: 'race', entries: [{ name: 'White', count: 1 }] },
      { name: 'age', entries: [{ name: '21-30', count: 1 }] },
      { name: 'gender', entries: [{ name: 'Male', count: 1 }] },
    ];

    const wrapper = shallow(
      <MemberAggregateSection
        activeMembers={ activeMembers }
        totalMembers={ totalMembers }
        memberFacets={ memberFacets }
      />
    );

    wrapper.find('.test--race-block').exists().should.have.length(1);
    wrapper.find('.test--age-block').exists().should.have.length(1);
    wrapper.find('.test--gender-block').exists().should.have.length(1);
  });
});
