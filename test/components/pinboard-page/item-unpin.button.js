import React from 'react';
import {
  renderIntoDocument,
  Simulate, }
from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';


describe('ItemUnpinButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should call removeItemInPinboardPage action when cliked on', function () {
    const removeItemInPinboardPage = stub();
    instance = renderIntoDocument(
      <ItemUnpinButton
        removeItemInPinboardPage={ removeItemInPinboardPage }
        item={ { isPinned: true, type: 'CR', id: '1' } } />
    );
    Simulate.click(findDOMNode(instance));
    removeItemInPinboardPage.calledWith({
      type: 'CR',
      id: '1',
      isPinned: true,
    }).should.be.true();
  });
});
