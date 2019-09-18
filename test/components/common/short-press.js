import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { spy, useFakeTimers } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import ShortPress from 'components/common/short-press';


describe('ShortPress component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render its children', function () {
    instance = renderIntoDocument(
      <ShortPress>
        <div className='test--classname' />
      </ShortPress>
    );

    findRenderedDOMComponentWithClass(instance, 'test--classname').should.be.ok();
  });

  it('should call action when click on', function () {
    const action = spy();
    instance = renderIntoDocument(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const domNode = findDOMNode(instance);
    Simulate.mouseDown(domNode, { screenX: 100, screenY: 200 });
    Simulate.mouseUp(domNode, { screenX: 100, screenY: 200 });

    action.called.should.be.true();
  });

  it('should call action when touch on', function () {
    const action = spy();
    instance = renderIntoDocument(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const domNode = findDOMNode(instance);
    Simulate.touchStart(domNode, { screenX: 100, screenY: 200 });
    Simulate.touchEnd(domNode, { screenX: 100, screenY: 200 });

    action.called.should.be.true();
  });

  it('should not call action when dragging', function () {
    const action = spy();
    instance = renderIntoDocument(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const domNode = findDOMNode(instance);
    Simulate.mouseDown(domNode, { screenX: 100, screenY: 200 });
    Simulate.mouseUp(domNode, { screenX: 200, screenY: 300 });

    action.called.should.be.false();
  });

  it('should not call action when dragging by touching', function () {
    const action = spy();
    instance = renderIntoDocument(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const domNode = findDOMNode(instance);
    Simulate.touchStart(domNode, { screenX: 100, screenY: 200 });
    Simulate.touchEnd(domNode, { screenX: 200, screenY: 300 });

    action.called.should.be.false();
  });

  it('should call action with short click', function () {
    const action = spy();
    instance = renderIntoDocument(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const domNode = findDOMNode(instance);
    const clock = useFakeTimers();
    Simulate.mouseDown(domNode, { screenX: 100, screenY: 200 });
    clock.tick(10);
    Simulate.mouseUp(domNode, { screenX: 100, screenY: 200 });
    clock.restore();

    action.called.should.be.true();
  });

  it('should not call action with long click', function () {
    const action = spy();
    instance = renderIntoDocument(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const domNode = findDOMNode(instance);
    const clock = useFakeTimers();
    Simulate.mouseDown(domNode, { screenX: 100, screenY: 200 });
    clock.tick(500);
    Simulate.mouseUp(domNode, { screenX: 200, screenY: 300 });
    clock.restore();

    action.called.should.be.false();
  });
});
