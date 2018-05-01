import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import SmoothScroller from 'components/common/smooth-scroller';
import Scroller from 'components/common/scroller';


describe('SmoothScroller component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SmoothScroller.should.be.renderable();
  });

  it('should return previous scrollOffset when selectedOffset has not changed', function () {
    instance = renderIntoDocument(<SmoothScroller selectedOffset={ 10 }/>);
    instance.prevScrollOffset.should.eql(10);
    instance = reRender(<SmoothScroller selectedOffset={ 10 }/>, instance);
    instance.prevScrollOffset = 3000;
    instance.getScrollOffset().should.eql(3000);
  });

  it('should calculate scroll offset based on selected scroller offset and margin', function () {
    instance = renderIntoDocument(<SmoothScroller selectedOffset={ 100 } directionMargin={ 10 } />);
    instance.getScrollOffset().should.eql(90);
  });

  it('should pass scroller ref', function () {
    const onScrollerRefSpy = spy();
    instance = renderIntoDocument(<SmoothScroller onScrollerRef={ onScrollerRefSpy } />);
    const scroller = findRenderedComponentWithType(instance, Scroller);
    scroller.props.onScrollerRef('a');
    onScrollerRefSpy.calledWith('a').should.be.true();
  });
});
