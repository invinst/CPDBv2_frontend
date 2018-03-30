import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import UnitChangeItem from 'components/officer-page/summary-page/biography-section/timeline/unit-change-item';


describe('UnitChangeItem component', function () {
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

    instance = renderIntoDocument(<UnitChangeItem item={ unitChange } hasBorderBottom={ false }/>);

    const rank = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-rank');
    const unit = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-unit');
    const content = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-content');
    const date = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-date');

    rank.textContent.should.eql(' ');
    unit.textContent.should.eql('UNIT CHANGE');
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

    instance = renderIntoDocument(<UnitChangeItem item={ unitChange } hasBorderBottom={ false }/>);

    const rank = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-rank');
    const unit = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-unit');
    const content = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-content');
    const date = findRenderedDOMComponentWithClass(instance, 'test--unit-change-item-date');

    rank.textContent.should.eql(' ');
    unit.textContent.should.eql('UNIT CHANGE');
    content.textContent.should.eql('Unit 153 - Mobile Strike Force');
    date.textContent.should.eql('APR 28');
  });
});
