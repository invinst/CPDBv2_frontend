import React from 'react';
import { shallow } from 'enzyme';

import UnitChange from 'components/officer-page/tabbed-pane-section/timeline/item/showings/unit-change';


describe('UnitChange component', function () {
  it('should render item correctly', function () {
    const unitChange = {
      date: 'APR 28',
      kind: 'UNIT_CHANGE',
      oldUnitDescription: 'Airport Enforcement',
      oldUnitName: 'Unit 051',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
      year: 1994,
    };

    const wrapper = shallow(
      <UnitChange item={ unitChange } hasBorderBottom={ false } />
    );

    const info = wrapper.find('.unit-change-info');
    const date = wrapper.find('.unit-change-item-date');

    info.text().should.equal('Unit 051 - Airport Enforcement → Unit 153 - Mobile Strike Force');
    date.text().should.equal('APR 28');
  });

  it('should render old unit as Unassigned if the old unit is marked with Unassigned', function () {
    const unitChange = {
      date: 'APR 28',
      kind: 'UNIT_CHANGE',
      oldUnitDescription: 'Some description',
      oldUnitName: 'Unassigned',
      rank: 'Police Officer',
      unitDescription: 'Mobile Strike Force',
      unitName: 'Unit 153',
      year: 1994,
    };

    const wrapper = shallow(
      <UnitChange item={ unitChange } hasBorderBottom={ false } />
    );

    const info = wrapper.find('.unit-change-info');
    const date = wrapper.find('.unit-change-item-date');

    info.text().should.equal('Unassigned → Unit 153 - Mobile Strike Force');
    date.text().should.equal('APR 28');
  });
});
