import React from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
}
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

    findRenderedDOMComponentWithClass(instance, 'is-pinned').should.be.ok();
  });

  it('should not have class is-pinned if suggesion.isPinned is false', function () {
    instance = renderIntoDocument(<ItemPinButton suggestion={ { isPinned: false } } />);

    scryRenderedDOMComponentsWithClass(instance, 'is-pinned').length.should.be.equal(0);
  });

  it('should call addOrRemoveItemInPinboard action when cliked on', function () {
    const addOrRemoveItemInPinboard = stub();
    instance = renderIntoDocument(
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        suggestion={ { isPinned: false, type: 'CR', id: '1' } } />
    );
    Simulate.click(findDOMNode(instance));
    addOrRemoveItemInPinboard.calledWith({
      type: 'CR',
      id: '1',
      isPinned: false,
    }).should.be.true();
  });
});
