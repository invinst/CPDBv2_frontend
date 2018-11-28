import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Award from 'components/officer-page/tabbed-pane-section/timeline/item/showings/award';


describe('Award component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    const awardItem = {
      date: 'Jan 01',
      kind: 'CR',
      unitName: '001',
      unitDisplay: '001 Display',
      rank: 'Police Officer',
      rankDisplay: 'Police Officer Display',
      isFirstRank: true,
      isLastRank: true,
      isFirstUnit: true,
      isLastUnit: true,
      category: 'Honorable Mention',
    };

    instance = renderIntoDocument(<Award item={ awardItem } hasBorderBottom={ true } />);

    const kind = findRenderedDOMComponentWithClass(instance, 'award-item-kind');
    const category = findRenderedDOMComponentWithClass(instance, 'award-item-category');
    const date = findRenderedDOMComponentWithClass(instance, 'award-item-date');

    kind.textContent.should.eql('Award');
    category.textContent.should.eql('Honorable Mention');
    date.textContent.should.eql('Jan 01');
  });
});
