import React from 'react';
import { findRenderedDOMComponentWithClass, renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Year from 'components/officer-page/tabbed-pane-section/timeline/item/showings/year';


describe('Year component', function () {
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
      unitDescription: 'Mobile Strike Force',
      unitName: '153',
    };

    instance = renderIntoDocument(<Year item={ year } hasBorderBottom={ false } />);

    const showing = findRenderedDOMComponentWithClass(instance, 'year-item-item-content');
    const date = findRenderedDOMComponentWithClass(instance, 'year-item-date');

    showing.textContent.should.eql('1994');
    date.textContent.should.eql('1994');
  });
});
