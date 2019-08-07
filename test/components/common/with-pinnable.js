import React, { Component } from 'react';
import {
  renderIntoDocument, Simulate,
  findRenderedDOMComponentWithClass,
}
from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import withPinnable from 'components/common/with-pinnable';

describe('ItemPinButton component', function () {
  let instance;

  class TestComponent extends Component {
    render() {
      return <div className='test--classname' />;
    }
  }

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render children', function () {
    const TestComponentWithPinnable = withPinnable(TestComponent);

    instance = renderIntoDocument(
      <TestComponentWithPinnable
        item={ { type: 'OFFICER', id: '123456', isPinned: false } }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--classname').should.be.ok();
  });

  it('should handle on pin button click', function () {
    const TestComponentWithPinnable = withPinnable(TestComponent);
    const addOrRemoveItemInPinboardStub = stub();

    instance = renderIntoDocument(
      <TestComponentWithPinnable
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardStub }
        item={ { type: 'OFFICER', id: '123456', isPinned: false } }
      />
    );

    const childComponent = findRenderedDOMComponentWithClass(instance, 'test--classname');
    Simulate.click(childComponent);

    addOrRemoveItemInPinboardStub.calledWith({
      type: 'OFFICER',
      id: '123456',
      isPinned: false,
    }).should.be.true();
  });
});
