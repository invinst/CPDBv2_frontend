import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import ShortPress from 'components/common/short-press';


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

    findRenderedComponentWithType(instance, ItemUnpinButton).should.be.ok();
    findRenderedDOMComponentWithClass(instance, 'location-card-date').textContent.should.eql('10-10-2010');
    findRenderedDOMComponentWithClass(instance, 'location-card-category').textContent.should.eql('Use Of Force');
  });

  it('should render card map with style if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    instance = renderIntoDocument(<LocationCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'location-card-map').should.be.ok();
    scryRenderedDOMComponentsWithClass(instance, 'empty-map').should.have.length(0);
  });

  it('should not render card map with style if point of item is null', function () {
    const item = { point: null };
    instance = renderIntoDocument(<LocationCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'location-card-map').should.be.ok();
    findRenderedDOMComponentWithClass(instance, 'empty-map').should.be.ok();
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
      id: '123',
    });
  });

  it('should render ShortPress if focusable', function () {
    const item = { point: null };
    instance = renderIntoDocument(
      <LocationCard item={ item } focusable={ true }/>
    );

    findRenderedComponentWithType(instance, ShortPress).should.be.ok();
    findRenderedDOMComponentWithClass(instance, 'location-card-body').should.be.ok();
  });

  it('should not render ShortPress if not focusable', function () {
    const item = { point: null };
    instance = renderIntoDocument(
      <LocationCard item={ item } focusable={ false }/>
    );

    scryRenderedComponentsWithType(instance.ShortPress).should.have.length(0);
    findRenderedDOMComponentWithClass(instance, 'location-card-body').should.be.ok();
  });

  it('should trigger focusItem when card focused', function () {
    const item = { type: 'CR', id: '123456' };
    const focusItem = spy();
    instance = renderIntoDocument(
      <LocationCard item={ item } focusable={ true } focusItem={ focusItem }/>
    );

    const card = findRenderedDOMComponentWithClass(instance, 'location-card-body');
    const cardNode = findDOMNode(card);

    Simulate.mouseDown(cardNode, { screenX: 0, screenY: 0 });
    Simulate.mouseUp(cardNode, { screenX: 0, screenY: 0 });

    focusItem.calledWith({ type: 'CR', id: '123456' }).should.be.true();
  });
});
