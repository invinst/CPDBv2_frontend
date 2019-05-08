import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass, Simulate,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import { findDOMNode } from 'react-dom';


describe('LocationCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      dateKey: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<LocationCard item={ item } dateKey='dateKey'/>);

    findRenderedComponentWithType(instance, ItemUnpinButton);
    findRenderedDOMComponentWithClass(instance, 'location-card-date').textContent.should.eql('10-10-2010');
    findRenderedDOMComponentWithClass(instance, 'location-card-category').textContent.should.eql('Use Of Force');
  });

  it('should render card map with style if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    instance = renderIntoDocument(<LocationCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'location-card-map');
    scryRenderedDOMComponentsWithClass(instance, 'empty-map').should.have.length(0);
  });

  it('should not render card map with style if point of item is null', function () {
    const item = { point: null };
    instance = renderIntoDocument(<LocationCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'location-card-map');
    findRenderedDOMComponentWithClass(instance, 'empty-map');
  });

  it('should fade in when added', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<LocationCard item={ item } isAdded={ true } dateKey='incidentDate'/>);

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('hide');
    instanceDom.className.should.containEql('fade-in');
  });

  it('should removeItemInPinboardPage when clicking on ItemUnpinButton', function () {
    const removeItemInPinboardPage = spy();

    const item = {
      type: 'CR',
      isPinned: false,
      id: '123',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(
      <LocationCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
        dateKey='incidentDate'
      />
    );
    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);

    Simulate.click(findDOMNode(unpinButton));

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'CR',
      id: '123'
    });
  });
});
