import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { Scrollbars } from 'react-custom-scrollbars';
import { stub } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import Scroller from 'components/common/scroller';


describe('Scroller component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    Scroller.should.be.renderable();
  });

  it('should give back scroller instance', function () {
    let element;
    instance = renderIntoDocument(<Scroller onScrollerRef={ el => element = el }/>);
    element.should.eql(instance.element);
    element.should.eql(findRenderedComponentWithType(instance, Scrollbars));
  });

  it('should call scrollTop when receive a new scrollTop', function () {
    const scrollTopStub = stub(Scrollbars.prototype, 'scrollTop');
    instance = renderIntoDocument(
      <Scroller scrollTop={ 0 }/>
    );

    instance = reRender(
      <Scroller scrollTop={ 10 }/>,
      instance
    );
    scrollTopStub.calledWith(10).should.be.true();
    scrollTopStub.restore();
  });

  it('should call scrollLeft when receive a new scrollLeft', function () {
    const scrollLeftStub = stub(Scrollbars.prototype, 'scrollLeft');
    instance = renderIntoDocument(
      <Scroller scrollLeft={ 0 }/>
    );

    instance = reRender(
      <Scroller scrollLeft={ 10 }/>,
      instance
    );
    scrollLeftStub.calledWith(10).should.be.true();
    scrollLeftStub.restore();
  });
});
