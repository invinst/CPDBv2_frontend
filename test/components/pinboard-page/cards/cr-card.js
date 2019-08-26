import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import CRCard, { CRCardWithUndo } from 'components/pinboard-page/cards/cr-card';
import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import { PINBOARD_ITEM_REMOVE_MODE } from 'utils/constants';


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

  it('should call action right away when user click on unpin button', function () {
    const item = {
      id: 123,
      type: 'CR',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const removeItemInPinboardPage = spy();
    instance = renderIntoDocument(
      <CRCardWithUndo
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    removeItemInPinboardPage.should.be.calledWith({
      id: 123,
      type: 'CR',
      mode: PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
    });
  });
});
