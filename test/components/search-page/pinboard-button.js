import React from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import PinboardButton from 'components/search-page/pinboard-button';
import { unmountComponentSuppressError } from 'utils/test';


describe('PinboardButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not display a Link component when there is no pinned item', function () {
    instance = renderIntoDocument(
      <PinboardButton pinboard={ { itemsCount: 0 } } />
    );

    scryRenderedComponentsWithType(instance, Link).should.have.length(0);
    findDOMNode(instance).textContent.should.eql('Your pinboard is empty');
  });

  it('should display a Link component when there are pinned items', function () {
    instance = renderIntoDocument(
      <PinboardButton pinboard={ { itemsCount: 2, url: '/pinboard/1/title/' } } />
    );

    const links = scryRenderedComponentsWithType(instance, Link);
    links.should.have.length(1);
    const link = links[0];
    link.props.to.should.eql('/pinboard/1/title/');
    link.props.children.should.eql('(2) Pinboard');
  });
});
