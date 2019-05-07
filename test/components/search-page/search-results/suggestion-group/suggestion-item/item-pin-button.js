import React from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
}
from 'react-addons-test-utils';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import { ItemPinButton } from
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

  it('should trigger action on hovering', function () {
    const addItemToPinboard = stub();
    const onPinButtonHoverToggle = stub();

    instance = renderIntoDocument(
      <ItemPinButton
        addItemToPinboard={ addItemToPinboard }
        onPinButtonHoverToggle={ onPinButtonHoverToggle }
        hovering={ false }
        suggestion={ { isPinned: false, type: 'CR', id: '1' } } />
    );
    instance = reRender(
      <ItemPinButton
        addItemToPinboard={ addItemToPinboard }
        onPinButtonHoverToggle={ onPinButtonHoverToggle }
        hovering={ true }
        suggestion={ { isPinned: false, type: 'CR', id: '1' } } />, instance
    );

    onPinButtonHoverToggle.calledWith(true).should.be.true();
  });
});
