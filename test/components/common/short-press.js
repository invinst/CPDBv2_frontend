import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';

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

    Simulate.mouseDown(findDOMNode(instance));
    Simulate.mouseUp(findDOMNode(instance));

    action.called.should.be.true();
  });

  it('should call action when touch on', function () {
    const action = spy();
    instance = renderIntoDocument(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    Simulate.touchStart(findDOMNode(instance));
    Simulate.touchEnd(findDOMNode(instance));

    action.called.should.be.true();
  });
});
