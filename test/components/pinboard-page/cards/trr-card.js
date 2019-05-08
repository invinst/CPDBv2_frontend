import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass, Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy, useFakeTimers } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import TRRCard from 'components/pinboard-page/cards/trr-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('TRRCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      trrDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<TRRCard item={ item }/>);

    findRenderedComponentWithType(instance, ItemUnpinButton);
    findRenderedDOMComponentWithClass(instance, 'location-card-date').textContent.should.eql('10-10-2010');
    findRenderedDOMComponentWithClass(instance, 'location-card-category').textContent.should.eql('Use Of Force');
  });

  it('should render card map with style if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    instance = renderIntoDocument(<TRRCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'location-card-map');
    scryRenderedDOMComponentsWithClass(instance, 'empty-map').should.have.length(0);
  });

  it('should not render card map with style if point of item is null', function () {
    const item = { point: null };
    instance = renderIntoDocument(<TRRCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'location-card-map');
    findRenderedDOMComponentWithClass(instance, 'empty-map');
  });

  it('should fade in when added', function () {
    const item = {
      trrDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<TRRCard item={ item } isAdded={ true }/>);

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('hide');
    instanceDom.className.should.containEql('fade-in');
  });

  it('should fade out when removed and invoke removeItemInPinboardPage after 1s', function () {
    const clock = useFakeTimers();
    const removeItemInPinboardPage = spy();

    const item = {
      type: 'TRR',
      isPinned: false,
      id: 123,
      trrDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(
      <TRRCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );
    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);

    Simulate.click(findDOMNode(unpinButton));

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('fade-out');
    removeItemInPinboardPage.should.not.be.called();

    clock.tick(1050);

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'TRR',
      isPinned: false,
      id: 123
    });

    clock.restore();
  });
});
