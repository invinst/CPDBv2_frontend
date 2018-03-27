import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import YearItem from 'components/officer-page/summary-page/biography-section/timeline/year-item';


describe('YearItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    const year = {
      date: '1994',
      hasData: true,
      isLastUnit: true,
      kind: 'YEAR',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Mobile Strike Force',
      unitDisplay: ' ',
      unitName: '153',
    };

    instance = renderIntoDocument(<YearItem item={ year } hasBorderBottom={ false }/>);

    const showing = findRenderedDOMComponentWithClass(instance, 'test--year-item-showing');
    const date = findRenderedDOMComponentWithClass(instance, 'test--year-item-date');

    showing.textContent.should.eql('1994');
    date.textContent.should.eql('1994');
  });
});
