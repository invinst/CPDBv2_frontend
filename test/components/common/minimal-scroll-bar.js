import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import { Scrollbars } from 'react-custom-scrollbars';


describe('MinimalScrollBars component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render Custom Scrollbars with received style', function () {
    instance = renderIntoDocument(<MinimalScrollBars style={ { container: 'abc' } } />);
    const scrollbars = findRenderedComponentWithType(instance, Scrollbars);
    scrollbars.props.style.should.eql('abc');
  });

  it('should set scrollTop when receive new value', function () {
    instance = renderIntoDocument(<MinimalScrollBars scrollTop={ 10 } />);
    stub(instance.scrollerRef, 'scrollTop');
    reRender(<MinimalScrollBars scrollTop={ 20 } />, instance);
    instance.scrollerRef.scrollTop.calledWith(20).should.be.true();
  });

  it('should set scrollLeft when receive new value', function () {
    instance = renderIntoDocument(<MinimalScrollBars scrollLeft={ 10 } />);
    stub(instance.scrollerRef, 'scrollLeft');
    reRender(<MinimalScrollBars scrollLeft={ 20 } />, instance);
    instance.scrollerRef.scrollLeft.calledWith(20).should.be.true();
  });
});
