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
      isLastRank: true,
      isFirstUnit: true,
      isLastUnit: true,
    };

    instance = renderIntoDocument(<BaseItem item={ item }/>);

    const rank = findRenderedDOMComponentWithClass(instance, 'test--base-item-rank');
    const unit = findRenderedDOMComponentWithClass(instance, 'test--base-item-unit');

    rank.textContent.should.eql('Police Officer Display');
    unit.textContent.should.eql('001 Display');
  });
});
