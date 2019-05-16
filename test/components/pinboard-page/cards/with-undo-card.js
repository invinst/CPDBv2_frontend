import React from 'react';
import { findDOMNode } from 'react-dom';

import { renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerCardComponent from 'components/pinboard-page/cards/officer-card';
import { OfficerCard } from 'components/pinboard-page/pinned-type';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('withUndoCard higher-order component', function () {
  let instance;
  const item = {
    type: 'OFFICER',
    isPinned: false,
    id: 123,
    rank: 'Officer as Detective',
    fullName: 'James David',
    complaintCount: '10',
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render wrapped component', function () {
    instance = renderIntoDocument(
      <OfficerCard item={ item } />
    );

    scryRenderedComponentsWithType(instance, OfficerCardComponent).should.have.length(1);
    scryRenderedDOMComponentsWithClass(instance, 'test--undo-card').should.have.length(0);
  });

  it('should render undo card when user click remove', function () {
    instance = renderIntoDocument(
      <OfficerCard item={ item } />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    scryRenderedDOMComponentsWithClass(instance, 'test--undo-card').should.have.length(1);
    scryRenderedComponentsWithType(instance, OfficerCardComponent).should.have.length(0);
  });

  it('should render nothing when user click unpin but not undo', function (done) {
    const removeItemInPinboardPage = spy();
    instance = renderIntoDocument(
      <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    setTimeout(() => {
      scryRenderedComponentsWithType(instance, OfficerCardComponent).should.have.length(0);
      scryRenderedDOMComponentsWithClass(instance, 'test--undo-card').should.have.length(0);
      done();
    }, 1050);
  });

  it('should trigger to remove item 1s after click on remove button', function (done) {
    const removeItemInPinboardPage = spy();

    instance = renderIntoDocument(
      <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage } />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    setTimeout(() => {
      removeItemInPinboardPage.should.be.calledWith({
        type: 'OFFICER',
        id: 123
      });
      done();
    }, 1050);
  });

  it('should cancel remove item if click on undo button', function (done) {
    const removeItemInPinboardPage = spy();

    instance = renderIntoDocument(
      <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage } />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    const undoButton = findRenderedDOMComponentWithClass(instance, 'undo-button');
    Simulate.click(undoButton);

    setTimeout(() => {
      removeItemInPinboardPage.should.not.be.called();
      done();
    }, 1050);
  });
});
