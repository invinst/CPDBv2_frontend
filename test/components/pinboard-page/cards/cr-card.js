import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import CRCard, { CRCardWithUndo } from 'components/pinboard-page/cards/cr-card';
import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('CRCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render LocationCard component', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    instance = renderIntoDocument(<CRCard item={ item }/>);

    findRenderedComponentWithType(instance, LocationCard).should.be.ok();
  });
});


describe('CRCardWithUndo component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render remove text correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    instance = renderIntoDocument(<CRCardWithUndo item={ item } />);
    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);

    Simulate.click(findDOMNode(unpinButton));

    findRenderedDOMComponentWithClass(instance, 'text').textContent.should.eql('CR removed.');
  });
});
