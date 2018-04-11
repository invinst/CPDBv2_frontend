import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Trr from 'components/officer-page/summary-page/tabbed-pane-section/timeline/item/showings/trr';
import * as baseStyles from 'components/officer-page/summary-page/tabbed-pane-section/timeline/item/item.style';


describe('Trr component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    const trrItem = {
      date: 'DEC 5',
      kind: 'FORCE',
      category: 'Use of Force Report',
      rank: 'Police Officer',
      rankDisplay: ' ',
      unitDescription: 'Recruit Training Section',
      unitDisplay: ' ',
      unitName: '153',
    };

    instance = renderIntoDocument(<Trr item={ trrItem } hasBorderBottom={ false } baseStyles={ baseStyles }/>);

    const kind = findRenderedDOMComponentWithClass(instance, 'test--trr-item-kind');
    const category = findRenderedDOMComponentWithClass(instance, 'test--trr-item-category');
    const date = findRenderedDOMComponentWithClass(instance, 'test--trr-item-date');

    kind.textContent.should.eql('Force');
    category.textContent.should.eql('Use of Force Report');
    date.textContent.should.eql('DEC 5');
  });
});
