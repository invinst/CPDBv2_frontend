import React from 'react';
import {
  renderIntoDocument,
  Simulate, }
from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import ItemPinButton from
  'components/search-page/search-results/suggestion-group/suggestion-item/item-pin-button';


describe('ItemPinButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should have class is-pinned if suggestion.isPinned is true', function () {
    instance = renderIntoDocument(<ItemPinButton suggestion={ { isPinned: true } } />);
    findDOMNode(instance).classList.contains('is-pinned').should.be.true();
  });

  it('should not have class is-pinned if suggesion.isPinned is false', function () {
    instance = renderIntoDocument(<ItemPinButton suggestion={ { isPinned: false } } />);
    findDOMNode(instance).classList.contains('is-pinned').should.be.false();
  });

  it('should call addItemToPinboard action when cliked on', function () {
    const addItemToPinboard = stub();
    instance = renderIntoDocument(
      <ItemPinButton
        addItemToPinboard={ addItemToPinboard }
        suggestion={ { isPinned: false, type: 'CR', id: '1' } } />
    );
    Simulate.click(findDOMNode(instance));
    addItemToPinboard.calledWith({
      type: 'CR',
      id: '1',
      isPinned: false,
    }).should.be.true();
  });
});
