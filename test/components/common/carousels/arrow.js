import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { spy } from 'sinon';
import Arrow from 'components/common/carousel/carousel-arrow';

describe('Carousel Arrow components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    Arrow.should.be.renderable();
  });

  it('should render', function () {
    instance = renderIntoDocument(
      <Arrow side='left'/>
    );
    const element = findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--left');
    element.querySelector('img').getAttribute('src').should.containEql('disclosure-indicator.svg');
  });

  it('should have appropriate click handler', function () {
    const spyClickHandler = spy();
    instance = renderIntoDocument(
      <Arrow side='left' clickHandler={ spyClickHandler }/>
    );
    const arrowWrapper = findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--left');
    Simulate.click(arrowWrapper);
    spyClickHandler.called.should.be.true();
  });
});
