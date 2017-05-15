import React from 'react';
import { stub } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import Scroller from 'components/officer-page/timeline-page/scroller';


describe('Scroller component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    Scroller.should.be.renderable();
  });

  it('should give back its element', function () {
    let element;
    instance = renderIntoDocument(<Scroller onElementRef={ el => element = el }/>);
    element.should.eql(instance.element);
    element.should.eql(findDOMNode(instance));
  });

  it('should set its element scrollTop when receive a new scrollTop', function () {
    stub(Scroller.prototype, 'handleElementRef');
    instance = renderIntoDocument(
      <Scroller scrollTop={ 0 }/>
    );
    instance.element = stub();
    instance = reRender(
      <Scroller scrollTop={ 10 }/>,
      instance
    );
    instance.element.scrollTop.should.eql(10);
    Scroller.prototype.handleElementRef.restore();
  });
});
