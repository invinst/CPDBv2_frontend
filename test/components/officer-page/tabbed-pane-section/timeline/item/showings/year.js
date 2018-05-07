import React from 'react';
import { findRenderedDOMComponentWithClass, renderIntoDocument, } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Year from 'components/officer-page/tabbed-pane-section/timeline/item/showings/year';
import * as baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/baseItem.style';


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
      rankDisplay: ' ',
      unitDescription: 'Mobile Strike Force',
      unitDisplay: ' ',
      unitName: '153',
    };

    instance = renderIntoDocument(<Year item={ year } hasBorderBottom={ false } baseStyles={ baseStyles }/>);

    const showing = findRenderedDOMComponentWithClass(instance, 'test--year-item-showing');
    const date = findRenderedDOMComponentWithClass(instance, 'test--year-item-date');

    showing.textContent.should.eql('1994');
    date.textContent.should.eql('1994');
  });
});
