import React from 'react';
import { stub } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import SmoothScroller from 'components/common/smooth-scroller';


describe('SmoothScroller component', function () {
  let instance;

  afterEach(function () {
    if (SmoothScroller.prototype.handleScrollerElementRef.restore) {
      SmoothScroller.prototype.handleScrollerElementRef.restore();
    }
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SmoothScroller.should.be.renderable();
  });

  it('should return 0 scrollOffset when scrollerEl is null', function () {
    stub(SmoothScroller.prototype, 'handleScrollerElementRef');
    instance = renderIntoDocument(<SmoothScroller/>);
    instance.prevScrollOffset = 100;
    instance.scrollerEl = null;
    instance.getScrollOffset().should.eql(0);
  });

  it('should return previous scrollOffset when selectedOffset has not changed', function () {
    stub(SmoothScroller.prototype, 'handleScrollerElementRef');
    instance = renderIntoDocument(<SmoothScroller selectedOffset={ 10 }/>);
    instance.prevScrollOffset.should.eql(0);
    instance = reRender(<SmoothScroller selectedOffset={ 10 }/>, instance);
    instance.scrollerEl = {};
    instance.prevScrollOffset = 3000;
    instance.getScrollOffset().should.eql(3000);
  });

  it('should calculate scrollTop based on scroller and item position', function () {
    stub(SmoothScroller.prototype, 'handleScrollerElementRef');
    instance = renderIntoDocument(<SmoothScroller selectedOffset={ 10 }/>);
    instance.scrollerEl = {
      getBoundingClientRect: () => ({ top: 20 }),
      scrollTop: 30
    };
    instance.getScrollOffset().should.eql(20);
  });

  it('should calculate scrollLeft based on scroller and item position', function () {
    stub(SmoothScroller.prototype, 'handleScrollerElementRef');
    instance = renderIntoDocument(<SmoothScroller direction='left' selectedOffset={ 10 }/>);
    instance.scrollerEl = {
      getBoundingClientRect: () => ({ left: 20 }),
      scrollLeft: 30
    };
    instance.getScrollOffset().should.eql(20);
  });
});
