import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import MemberAggregateSection from 'components/unit-profile-page/summary-page/member-aggregate-section';


describe('MemberAggregateSection component', function () {
  it('should render races, ages and genders', function () {
    const activeMembers = 1;
    const totalMembers = 1;
    const memberFacets = [
      { name: 'race', entries: [{ name: 'White', count: 1 }] },
      { name: 'age', entries: [{ name: '21-30', count: 1 }] },
      { name: 'gender', entries: [{ name: 'Male', count: 1 }] }
    ];

    const instance = renderIntoDocument(
      <MemberAggregateSection activeMembers={ activeMembers }
        totalMembers={ totalMembers } memberFacets={ memberFacets }/>
    );

    scryRenderedDOMComponentsWithClass(instance, 'test--race-block').should.have.length(1);
    scryRenderedDOMComponentsWithClass(instance, 'test--age-block').should.have.length(1);
    scryRenderedDOMComponentsWithClass(instance, 'test--gender-block').should.have.length(1);
  });
});
