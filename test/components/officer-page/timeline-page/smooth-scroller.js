import React from 'react';
import { stub } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import SmoothScroller from 'components/officer-page/timeline-page/smooth-scroller';


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

  it('should return 0 scrollTop when scrollerEl is null', function () {
    stub(SmoothScroller.prototype, 'handleScrollerElementRef');
    instance = renderIntoDocument(<SmoothScroller/>);
    instance.prevScrollTop = 100;
    instance.scrollerEl = null;
    instance.getScrollTop().should.eql(0);
  });

  it('should calculate scrollTop based on scroller and item position', function () {
    stub(SmoothScroller.prototype, 'handleScrollerElementRef');
    instance = renderIntoDocument(<SmoothScroller selectedItemTop={ 10 }/>);
    instance.scrollerEl = {
      getBoundingClientRect: () => ({ top: 20 }),
      scrollTop: 30
    };
    instance.getScrollTop().should.eql(6);
  });

  it('should return previous scrollTop when selectedItemTop has not changed', function () {
    stub(SmoothScroller.prototype, 'handleScrollerElementRef');
    instance = renderIntoDocument(<SmoothScroller selectedItemTop={ 10 }/>);
    instance.prevScrollTop.should.eql(0);
    instance = reRender(<SmoothScroller selectedItemTop={ 10 }/>, instance);
    instance.scrollerEl = {};
    instance.prevScrollTop = 3000;
    instance.getScrollTop().should.eql(3000);
  });
});
