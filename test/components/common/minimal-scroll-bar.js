import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import { Scrollbars } from 'react-custom-scrollbars';


describe('MinimalScrollBars component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <MinimalScrollBars style={ { container: 'abc' } } viewClassName='some-view-class-name'/>
    );

    const scrollbars = findRenderedComponentWithType(instance, Scrollbars);
    scrollbars.props.style.should.eql('abc');
    findRenderedDOMComponentWithClass(instance, 'test--minimal-scrollbars-vertical-thumb');
    const scrollView = scryRenderedDOMComponentsWithTag(instance, 'div')[1];
    scrollView.getAttribute('class').should.eql('some-view-class-name');
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

  it('should not render vertical thumb when showThumb is false', function () {
    instance = renderIntoDocument(<MinimalScrollBars showThumb={ false } />);
    scryRenderedDOMComponentsWithClass(
      instance, 'test--minimal-scrollbars-vertical-thumb'
    ).should.have.length(0);
  });
});
