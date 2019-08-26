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
import TRRCard, { TRRCardWithUndo } from 'components/pinboard-page/cards/trr-card';
import LocationCard from 'components/pinboard-page/cards/location-card';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';
import { PINBOARD_ITEM_REMOVE_MODE } from 'utils/constants';


describe('TRRCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render LocationCard component', function () {
    const item = {
      trrDate: '10-10-2010',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    instance = renderIntoDocument(<TRRCard item={ item }/>);

    findRenderedComponentWithType(instance, LocationCard).should.be.ok();
  });
});


describe('TRRCardWithUndo component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render remove text correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };

    instance = renderIntoDocument(<TRRCardWithUndo item={ item } />);
    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    findRenderedDOMComponentWithClass(instance, 'text').textContent.should.eql('TRR removed.');
  });

  it('should call action right away when user click on unpin button', function () {
    const item = {
      id: 123456,
      type: 'TRR',
      trrDate: '10-10-2010',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    const removeItemInPinboardPage = spy();
    instance = renderIntoDocument(
      <TRRCardWithUndo
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    removeItemInPinboardPage.should.be.calledWith({
      id: 123456,
      type: 'TRR',
      mode: PINBOARD_ITEM_REMOVE_MODE.API_ONLY,
    });
  });
});
