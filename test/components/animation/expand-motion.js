import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import should from 'should';

import { withAnimationDisabled } from 'utils/test';
import * as utilsDom from 'utils/dom';
import ExpandMotion from 'components/animation/expand-motion';


describe('ExpandMotion component', function () {
  context('animation disabled', function () {
    it('should render children if show is true', function () {
      withAnimationDisabled(() => {
        const wrapper = shallow(
          <ExpandMotion show={ true }><div/></ExpandMotion>
        );
        wrapper.find('div').exists().should.be.true();
      });
    });

    it('should render nothing if show is false', function () {
      withAnimationDisabled(() => {
        const wrapper = shallow(
          <ExpandMotion show={ false }><p/></ExpandMotion>
        );
        should(wrapper.type()).be.null();
      });
    });
  });

  context('animation enabled', function () {
    it('should render nothing initially if show is false', function () {
      const wrapper = mount(
        <ExpandMotion show={ false }><p/></ExpandMotion>
      );
      should(wrapper.type()).be.null();
    });

    it('should render chilren in full height eventually', function (done) {
      stub(utilsDom, 'innerHeight').returns(100);
      const wrapper = shallow(
        <ExpandMotion show={ true }><div/></ExpandMotion>
      );
      setTimeout(() => {
        wrapper.state('childHeight').should.equal(100);
        wrapper.prop('style').height.should.equal('100px');
        utilsDom.innerHeight.restore();
        done();
      }, 1000);
    });

  });
});
