import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import UnitChange from 'components/officer-page/summary-page/biography-section/timeline/item/showings/unit-change';
import * as baseStyles from 'components/officer-page/summary-page/biography-section/timeline/item/item.style';


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
      oldUnitName: '051',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Mobile Strike Force',
      unitDisplay: ' ',
      unitName: '153',
      year: 1994,
    };

    instance = renderIntoDocument(
      <UnitChange item={ unitChange } hasBorderBottom={ false } baseStyles={ baseStyles }/>
    );

    const content = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-content');
    const date = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-date');

    content.textContent.should.eql('Unit 051 - Airport Enforcement → Unit 153 - Mobile Strike Force');
    date.textContent.should.eql('APR 28');
  });

  it('should render new unit only if the old unit is empty string', function () {
    const unitChange = {
      date: 'APR 28',
      kind: 'UNIT_CHANGE',
      oldUnitDescription: '',
      oldUnitName: '',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Mobile Strike Force',
      unitDisplay: ' ',
      unitName: '153',
      year: 1994,
    };

    instance = renderIntoDocument(
      <UnitChange item={ unitChange } hasBorderBottom={ false } baseStyles={ baseStyles }/>
    );

    const content = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-content');
    const date = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-date');

    content.textContent.should.eql('Unit 153 - Mobile Strike Force');
    date.textContent.should.eql('APR 28');
  });
});
