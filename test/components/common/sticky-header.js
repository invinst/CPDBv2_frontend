import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { stub, spy } from 'sinon';

import StickyHeader, { recalculateStickyness } from 'components/common/sticky-header';
import { unmountComponentSuppressError } from 'utils/test';
import * as domUtils from 'utils/dom';


describe('StickyHeader component', function () {
  let instance;

  beforeEach(function () {
    stub(domUtils, 'isScrolledToBottom');
  });

  afterEach(function () {
    domUtils.isScrolledToBottom.restore();
    unmountComponentSuppressError(instance);
  });

  it('should recalculate stickyness if recalculateStickyness is called', function () {
    const recalculateStickynessSpy = spy(StickyHeader.prototype, 'recalculateStickyness');
    instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );

    recalculateStickyness();
    recalculateStickynessSpy.callCount.should.be.eql(1);

    unmountComponentSuppressError(instance);
    recalculateStickyness();
    recalculateStickynessSpy.callCount.should.be.eql(1);
  });

  it('should not be sticky if place holder is null', function () {
    instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );
    instance.placeholderElement = null;
    recalculateStickyness();
    instance.state.isSticky.should.be.false();
  });

  it('should not be sticky if place holder is available', function () {
    instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );

    stub(instance.placeholderElement, 'getBoundingClientRect').callsFake(() => ({ top: 1 }));
    recalculateStickyness();
    instance.state.isSticky.should.be.false();
  });

  it('should be sticky if place holder is hidden', function () {
    instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );

    stub(instance.placeholderElement, 'getBoundingClientRect').callsFake(() => ({ top: -1 }));
    recalculateStickyness();
    instance.state.isSticky.should.be.true();
  });

  it('should set isAtBottom state according to dom util isScrolledToBottom()', function () {
    instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );

    domUtils.isScrolledToBottom.returns(true);
    recalculateStickyness();
    instance.state.isAtBottom.should.be.true();

    domUtils.isScrolledToBottom.returns(false);
    recalculateStickyness();
    instance.state.isAtBottom.should.be.false();
  });

  it('should trigger handleStateChange callback when isAtBottom is flipped', function () {
    const spyHandleStateChange = spy();
    instance = renderIntoDocument(
      <StickyHeader handleStateChange={ spyHandleStateChange }>
        <div />
      </StickyHeader>
    );

    domUtils.isScrolledToBottom.returns(true);
    recalculateStickyness();

    spyHandleStateChange.callCount.should.eql(1);
  });

  it('should trigger handleStateChange callback when isSticky is flipped', function () {
    const spyHandleStateChange = spy();
    instance = renderIntoDocument(
      <StickyHeader handleStateChange={ spyHandleStateChange }>
        <div />
      </StickyHeader>
    );

    instance.placeholderElement = null;
    recalculateStickyness();

    spyHandleStateChange.callCount.should.eql(1);
  });

  it('should NOT trigger handleStateChange callback when isSticky and isAtBottom stay the same', function () {
    const spyHandleStateChange = spy();
    instance = renderIntoDocument(
      <StickyHeader handleStateChange={ spyHandleStateChange }>
        <div />
      </StickyHeader>
    );

    recalculateStickyness();

    spyHandleStateChange.callCount.should.eql(1);
  });
});
