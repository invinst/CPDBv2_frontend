import React from 'react';
import { stub, spy } from 'sinon';
import { render } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';
import * as wrapper from 'utils/wrapper';

import { unmountComponentSuppressError } from 'utils/test';
import MasonryLayout from 'components/common/masonry-layout';


describe('MasonryLayout component', function () {
  let instance;
  let bricksInstance;
  const child1 = <div key='1'/>;
  const child2 = <div key='2'/>;

  beforeEach(function () {
    bricksInstance = { resize: spy(), pack: spy(), update: spy() };
    stub(wrapper, 'Bricks').returns(bricksInstance);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    wrapper.Bricks.restore();
  });

  it('should invoke Bricks when mounted', function () {
    const children = [child1, child2];
    instance = renderIntoDocument(<MasonryLayout>{ children }</MasonryLayout>);
    wrapper.Bricks.calledOnce.should.be.true();
    bricksInstance.resize.calledWith(true).should.be.true();
  });

  it('should call pack and update when children change', function () {
    const rootElement = document.createElement('DIV');
    instance = render(<MasonryLayout>{ [] }</MasonryLayout>, rootElement);

    instance = render(<MasonryLayout>{ [] }</MasonryLayout>, rootElement);
    bricksInstance.pack.callCount.should.equal(0);
    bricksInstance.update.callCount.should.equal(0);

    instance = render(<MasonryLayout>{ [child1] }</MasonryLayout>, rootElement);
    bricksInstance.pack.callCount.should.equal(1);
    bricksInstance.update.callCount.should.equal(0);

    instance = render(<MasonryLayout>{ [child2] }</MasonryLayout>, rootElement);
    bricksInstance.pack.callCount.should.equal(2);
    bricksInstance.update.callCount.should.equal(0);

    instance = render(<MasonryLayout>{ [child2, child1] }</MasonryLayout>, rootElement);
    bricksInstance.pack.callCount.should.equal(2);
    bricksInstance.update.callCount.should.equal(1);
  });
});
