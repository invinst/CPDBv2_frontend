import React from 'react';
import { shallow } from 'enzyme';

import TRRDetail from 'components/trr-page/trr-info-section/trr-detail';
import Row from 'components/trr-page/trr-info-section/trr-detail/row';
import Demographics from 'components/common/demographics';


describe('TRRDetail component', function () {
  it('should render 3 Rows with correct order', function () {
    const trrDetail = {
      subjectDemographic: 'Black, Male, 21 years old',
      category: 'Other',
      forceTypes: ['Stiffened (Dead Weight)', 'Did Not Follow Verbal Direction', 'Imminent Threat Of Battery'],
    };

    const wrapper = shallow(
      <TRRDetail{ ...trrDetail }/>
    );

    const rows = wrapper.find(Row);
    const subjectRow = rows.at(0);
    const categoryRow = rows.at(1);
    const forceTypeRow = rows.at(2);

    subjectRow.prop('title').should.equal('subject');
    subjectRow.prop('borderValue').should.be.true();
    subjectRow.prop('twoRowsWhenPrint').should.be.true();
    subjectRow.find(Demographics).prop('persons').should.eql(['Black, Male, 21 years old']);

    categoryRow.prop('title').should.equal('force category');
    categoryRow.prop('borderValue').should.be.false();
    categoryRow.prop('children').should.equal('Other');

    forceTypeRow.prop('title').should.equal('types of force');
    forceTypeRow.prop('borderValue').should.be.false();
    forceTypeRow.prop('children').should.eql(
      'Stiffened (Dead Weight) ← Did Not Follow Verbal Direction ← Imminent Threat Of Battery'
    );
  });

  it('should handle if the forceTypes is undefined', function () {
    const trrDetail = {
      subjectDemographic: 'Black, Male, 21 years old',
      category: 'Other',
    };

    const wrapper = shallow(
      <TRRDetail{ ...trrDetail }/>
    );
    const rows = wrapper.find(Row);
    const forceTypeRow = rows.at(2);

    forceTypeRow.prop('children').should.equal('');
  });

  it('should handle if the subjectDemographic is undefined', function () {
    const trrDetail = {
      category: 'Other',
      forceTypes: ['Stiffened (Dead Weight)'],
      actions: ['Stiffened (Dead Weight)'],
    };
    const wrapper = shallow(
      <TRRDetail{ ...trrDetail }/>
    );
    const rows = wrapper.find(Row);
    const subjectRow = rows.at(0);

    subjectRow.prop('borderValue').should.be.false();
    subjectRow.find(Demographics).exists().should.be.false();
  });
});
