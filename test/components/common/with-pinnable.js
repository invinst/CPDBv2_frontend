import React, { Component } from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { lorem, random } from 'faker';

import { unmountComponentSuppressError } from 'utils/test';
import withPinnable from 'components/common/with-pinnable';
import { PINNED_ITEM_TYPES } from 'utils/constants';


describe('ItemPinButton component', function () {
  let instance;
  const firstCRID = lorem.word();
  const secondCRID = lorem.word();
  const officerID = random.number({ min: 10, max: 1000 });

  class TestComponent extends Component {
    render() {
      return <div className='test--classname' />;
    }
  }
  const TestComponentWithPinnable = withPinnable(TestComponent);

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render children', function () {
    instance = renderIntoDocument(
      <TestComponentWithPinnable
        item={ { type: 'OFFICER', id: officerID, isPinned: false } }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--classname').should.be.ok();
  });

  it('should handle on pin button click', function () {
    const addOrRemoveItemInPinboardStub = stub();

    instance = renderIntoDocument(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        item={ { type: 'OFFICER', id: officerID, isPinned: false } }
      />
    );

    const childComponent = findRenderedDOMComponentWithClass(instance, 'test--classname');
    Simulate.click(childComponent);

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: officerID,
      isPinned: false,
    }).should.be.true();
  });

  it('should handle on pin button with all items are pinned', function () {
    const addOrRemoveItemInPinboardStub = stub();

    instance = renderIntoDocument(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: PINNED_ITEM_TYPES.CR, id: firstCRID, isPinned: true },
          { type: PINNED_ITEM_TYPES.CR, id: secondCRID, isPinned: true },
        ] }
      />
    );

    const childComponent = findRenderedDOMComponentWithClass(instance, 'test--classname');
    Simulate.click(childComponent);

    addOrRemoveItemInPinboardStub.should.be.calledTwice();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINNED_ITEM_TYPES.CR,
      id: firstCRID,
      isPinned: true,
    });
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINNED_ITEM_TYPES.CR,
      id: secondCRID,
      isPinned: true,
    });
  });

  it('should handle on pin button with all items are not pinned', function () {
    const addOrRemoveItemInPinboardStub = stub();

    instance = renderIntoDocument(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: PINNED_ITEM_TYPES.CR, id: firstCRID, isPinned: false },
          { type: PINNED_ITEM_TYPES.CR, id: secondCRID, isPinned: false },
        ] }
      />
    );

    const childComponent = findRenderedDOMComponentWithClass(instance, 'test--classname');
    Simulate.click(childComponent);

    addOrRemoveItemInPinboardStub.should.be.calledTwice();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINNED_ITEM_TYPES.CR,
      id: firstCRID,
      isPinned: false,
    });
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINNED_ITEM_TYPES.CR,
      id: secondCRID,
      isPinned: false,
    });
  });

  it('should handle on pin button with not all items are pinned', function () {
    const addOrRemoveItemInPinboardStub = stub();

    instance = renderIntoDocument(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        items={ [
          { type: PINNED_ITEM_TYPES.CR, id: firstCRID, isPinned: true },
          { type: PINNED_ITEM_TYPES.CR, id: secondCRID, isPinned: false },
        ] }
      />
    );

    const childComponent = findRenderedDOMComponentWithClass(instance, 'test--classname');
    Simulate.click(childComponent);

    addOrRemoveItemInPinboardStub.should.be.calledOnce();
    addOrRemoveItemInPinboardStub.should.be.calledWith({
      type: PINNED_ITEM_TYPES.CR,
      id: secondCRID,
      isPinned: false,
    });
  });
});
