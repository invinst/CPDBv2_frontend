import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import Trr from 'components/officer-page/tabbed-pane-section/timeline/item/showings/trr';


describe('Trr component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item correctly', function () {
    const trrItem = {
      trrId: 123,
      date: 'DEC 5',
      kind: 'FORCE',
      category: 'Use of Force Report',
      rank: 'Police Officer',
      unitDescription: 'Recruit Training Section',
      unitName: '153',
    };

    instance = renderIntoDocument(<Trr item={ trrItem } hasBorderBottom={ false } />);

    const kind = findRenderedDOMComponentWithClass(instance, 'trr-item-kind');
    const category = findRenderedDOMComponentWithClass(instance, 'trr-item-category');
    const date = findRenderedDOMComponentWithClass(instance, 'trr-item-date');

    kind.textContent.should.eql('Force');
    category.textContent.should.eql('Use of Force Report');
    date.textContent.should.eql('DEC 5');

    const link = findRenderedComponentWithType(instance, Link);

    link.props.to.should.eql('/trr/123/');
  });
});
