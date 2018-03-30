import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import BaseItem from 'components/officer-page/summary-page/biography-section/timeline/base-item';


describe('BaseItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    const item = {
      date: 'Jan 01',
      kind: 'AWARD',
      unitName: '001',
      unitDisplay: '001 Display',
      rank: 'Police Officer',
      rankDisplay: 'Police Officer Display',
      isFirstRank: true,
      isLastRank: false,
      isFirstUnit: true,
      isLastUnit: false,
    };

    instance = renderIntoDocument(<BaseItem item={ item }/>);

    const rank = findRenderedDOMComponentWithClass(instance, 'test--base-item-rank');
    const unit = findRenderedDOMComponentWithClass(instance, 'test--base-item-unit');

    rank.textContent.should.eql('Police Officer Display');
    unit.textContent.should.eql('001 Display');
  });

  it('should render unit name as a space if it is the first event in that unit duration ' +
    'and unitDisplay is an empty string', function () {
    const item = {
      date: 'Jan 01',
      kind: 'AWARD',
      unitName: '001',
      unitDisplay: '',
      rank: 'Police Officer',
      rankDisplay: 'Police Officer Display',
      isFirstRank: false,
      isLastRank: false,
      isFirstUnit: true,
      isLastUnit: false,
    };

    instance = renderIntoDocument(<BaseItem item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'test--base-item-unit').textContent.should.eql(' ');
  });
});
