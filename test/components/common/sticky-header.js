import React from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { stub, spy } from 'sinon';

import StickyHeader, { recalculateStickyness } from 'components/common/sticky-header';
import { unmountComponentSuppressError } from 'utils/test';


describe('StickyHeader component', function () {
  it('should recalculate stickyness if recalculateStickyness is called', function () {
    const recalculateStickynessSpy = spy(StickyHeader.prototype, 'recalculateStickyness');
    const instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );

    recalculateStickyness();
    recalculateStickynessSpy.callCount.should.be.eql(1);

    unmountComponentSuppressError(instance);
    recalculateStickyness();
    recalculateStickynessSpy.callCount.should.be.eql(1);
  });

  it('should not be sticky if place holder is null', function () {
    const instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );
    instance.placeholderElement = null;
    recalculateStickyness();
    instance.state.isSticky.should.be.false();
  });

  it('should not be sticky if place holder is available', function () {
    const instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );

    stub(instance.placeholderElement, 'getBoundingClientRect').callsFake(() => ({ top: 1 }));
    recalculateStickyness();
    instance.state.isSticky.should.be.false();
  });

  it('should be sticky if place holder is hidden', function () {
    const instance = renderIntoDocument(
      <StickyHeader><div /></StickyHeader>
    );

    stub(instance.placeholderElement, 'getBoundingClientRect').callsFake(() => ({ top: -1 }));
    recalculateStickyness();
    instance.state.isSticky.should.be.true();
  });
});
