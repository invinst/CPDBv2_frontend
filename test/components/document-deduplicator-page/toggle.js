import React from 'react';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy, stub } from 'sinon';

import Toggle from 'components/document-deduplicator-page/document-row/toggle';

import { unmountComponentSuppressError } from 'utils/test';

describe('DocumentDeduplicatorPage Toggle component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should trigger onChange and stop propagation when clicked on', function () {
    const onChange = spy();

    instance = renderIntoDocument(
      <Toggle on={ true } onChange={ onChange }/>
    );

    const toggle = findDOMNode(instance);
    const dummyEvent = {
      stopPropagation: stub(),
    };
    Simulate.click(toggle, dummyEvent);

    onChange.calledOnce.should.be.true();
    onChange.calledWith(true).should.be.true();
    dummyEvent.stopPropagation.calledOnce.should.be.true();
  });

  it('should have class toggle-on if is "on"', function () {
    instance = renderIntoDocument(
      <Toggle on={ true }/>
    );

    const toggle = findDOMNode(instance);

    toggle.classList.contains('toggle-on').should.be.true();
  });

  it('should not have class toggle-on if is not "on"', function () {
    instance = renderIntoDocument(
      <Toggle on={ false }/>
    );

    const toggle = findDOMNode(instance);

    toggle.classList.contains('toggle-on').should.be.false();
  });
});
