import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import { spy } from 'sinon';
import Arrow from 'components/common/carousel/arrow';

describe('Carousel Arrow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render', function () {
    instance = renderIntoDocument(
      <Arrow direction='left' show={ true }/>
    );
    findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--left').should.be.ok();
  });

  it('should have appropriate click handler', function () {
    const spyClickHandler = spy();
    instance = renderIntoDocument(
      <Arrow direction='left' onClick={ spyClickHandler } show={ true }/>
    );
    const arrowWrapper = findRenderedDOMComponentWithClass(instance, 'test--carousel--arrow--left');
    Simulate.click(arrowWrapper);
    spyClickHandler.called.should.be.true();
  });
});
