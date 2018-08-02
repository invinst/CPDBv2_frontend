import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass, } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RankChange from 'components/officer-page/tabbed-pane-section/timeline/item/showings/rank-change';
import * as baseStyles from 'components/officer-page/tabbed-pane-section/timeline/item/baseItem.style';


describe('RankChange component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    const rankChange = {
      date: 'APR 28',
      oldRank: 'Officer',
      rank: 'Detective',
    };

    instance = renderIntoDocument(
      <RankChange item={ rankChange } hasBorderBottom={ false } baseStyles={ baseStyles }/>
    );

    const content = findRenderedDOMComponentWithClass(instance, 'test--rank-change-item-content');
    const date = findRenderedDOMComponentWithClass(instance, 'test--rank-change-item-date');

    content.textContent.should.eql('Officer → Detective');
    date.textContent.should.eql('APR 28');
  });
});
