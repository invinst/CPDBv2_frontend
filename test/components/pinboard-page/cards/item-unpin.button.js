import React from 'react';
import {
  renderIntoDocument,
  Simulate, }
from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('ItemUnpinButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should call removeItemInPinboardPage action and onClick when cliked on', function () {
    const removeItemInPinboardPage = stub();
    const onClick = stub();
    instance = renderIntoDocument(
      <ItemUnpinButton
        removeItemInPinboardPage={ removeItemInPinboardPage }
        item={ { isPinned: true, type: 'CR', id: '1' } }
        onClick={ onClick }
      />
    );
    Simulate.click(findDOMNode(instance));
    removeItemInPinboardPage.calledWith({
      type: 'CR',
      id: '1',
      isPinned: true,
    }).should.be.true();
    onClick.should.be.calledOnce();
  });
});
