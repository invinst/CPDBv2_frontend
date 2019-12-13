import React from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
}
  from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';

import ItemPinButton from 'components/common/item-pin-button';
import styles from 'components/common/item-pin-button.sass';


describe('ItemPinButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<ItemPinButton item={ { isPinned: true } } />);
    const pinButton = findRenderedDOMComponentWithClass(instance, styles.itemPinButton);
    pinButton.className.should.containEql('pinboard-feature');
  });

  it('should have class is-pinned if item.isPinned is true', function () {
    instance = renderIntoDocument(<ItemPinButton item={ { isPinned: true } } />);
    findRenderedDOMComponentWithClass(instance, 'is-pinned').should.be.ok();
  });

  it('should not have class is-pinned if item.isPinned is false', function () {
    instance = renderIntoDocument(<ItemPinButton item={ { isPinned: false } } />);

    scryRenderedDOMComponentsWithClass(instance, 'is-pinned').length.should.be.equal(0);
  });

  it('should call addOrRemoveItemInPinboard action when clicked on', function () {
    const addOrRemoveItemInPinboard = stub();
    instance = renderIntoDocument(
      <ItemPinButton
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
        item={ { isPinned: false, type: 'CR', id: '1' } } />
    );
    Simulate.click(findDOMNode(instance));
    addOrRemoveItemInPinboard.calledWith({
      type: 'CR',
      id: '1',
      isPinned: false,
    }).should.be.true();
  });

  it('should have class is-pinned if all items inPinned are true', function () {
    instance = renderIntoDocument(<ItemPinButton items={ [{ isPinned: true }, { isPinned: true }] }/>);

    findRenderedDOMComponentWithClass(instance, 'is-pinned').should.be.ok();
  });

  it('should not have class is-pinned if not all items inPinned are true', function () {
    instance = renderIntoDocument(<ItemPinButton items={ [{ isPinned: false }, { isPinned: true }] }/>);

    scryRenderedDOMComponentsWithClass(instance, 'is-pinned').length.should.be.equal(0);
  });

  it('should render pin action hint if showHint is true', function () {
    instance = renderIntoDocument(<ItemPinButton />);

    findRenderedDOMComponentWithClass(instance, 'pin-action-hint').should.be.ok();
  });

  it('should not render pin action hint if showHint is false', function () {
    instance = renderIntoDocument(<ItemPinButton showHint={ false }/>);

    scryRenderedDOMComponentsWithClass(instance, 'pin-action-hint').length.should.be.equal(0);
  });
});
