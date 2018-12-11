import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import UnitChange from 'components/officer-page/tabbed-pane-section/timeline/item/showings/unit-change';


describe('UnitChange component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


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

    instance = renderIntoDocument(
      <UnitChange item={ unitChange } hasBorderBottom={ false } />
    );

    const info = findRenderedDOMComponentWithClass(instance, 'unit-change-info');
    const date = findRenderedDOMComponentWithClass(instance, 'unit-change-item-date');

    info.textContent.should.eql('Unit 051 - Airport Enforcement → Unit 153 - Mobile Strike Force');
    date.textContent.should.eql('APR 28');
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

    instance = renderIntoDocument(
      <UnitChange item={ unitChange } hasBorderBottom={ false } />
    );

    const info = findRenderedDOMComponentWithClass(instance, 'unit-change-info');
    const date = findRenderedDOMComponentWithClass(instance, 'unit-change-item-date');

    info.textContent.should.eql('Unassigned → Unit 153 - Mobile Strike Force');
    date.textContent.should.eql('APR 28');
  });
});
