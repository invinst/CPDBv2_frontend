import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import * as wrapperUtils from 'utils/wrapper';

import MasonryLayout from 'components/common/masonry-layout';


describe('MasonryLayout component', function () {
  let bricksInstance;
  const child1 = <div key='1'/>;
  const child2 = <div key='2'/>;

  beforeEach(function () {
    bricksInstance = { resize: sinon.spy(), pack: sinon.spy(), update: sinon.spy() };
    sinon.stub(wrapperUtils, 'Bricks').returns(bricksInstance);
  });

  afterEach(function () {
    wrapperUtils.Bricks.restore();
  });

  it('should invoke Bricks when mounted', function () {
    const children = [child1, child2];
    mount(<MasonryLayout>{ children }</MasonryLayout>);
    wrapperUtils.Bricks.should.be.calledOnce();
    bricksInstance.resize.should.be.calledWith(true);
  });

  it('should call pack and update when children change', function () {
    const wrapper = mount(<MasonryLayout>{ [] }</MasonryLayout>);
    wrapper.setProps({ children: [] });

    bricksInstance.pack.callCount.should.equal(0);
    bricksInstance.update.callCount.should.equal(0);

    wrapper.setProps({ children: [child1] });
    bricksInstance.pack.callCount.should.equal(1);
    bricksInstance.update.callCount.should.equal(0);

    wrapper.setProps({ children: [child2] });
    bricksInstance.pack.callCount.should.equal(2);
    bricksInstance.update.callCount.should.equal(0);

    wrapper.setProps({ children: [child2, child1] });
    bricksInstance.pack.callCount.should.equal(2);
    bricksInstance.update.callCount.should.equal(1);
  });
});
