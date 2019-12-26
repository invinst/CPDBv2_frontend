import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { stub } from 'sinon';
import should from 'should';
import { Motion } from 'react-motion';

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
      const wrapper = render(
        <ExpandMotion show={ false }><p/></ExpandMotion>
      );
      should(wrapper.html()).be.null();
    });

    it('should render children in full height eventually', function (done) {
      stub(utilsDom, 'innerHeight').returns(100);
      const wrapper = mount(
        <ExpandMotion show={ true }><div/></ExpandMotion>
      );
      setTimeout(() => {
        wrapper.state('childHeight').should.equal(100);
        wrapper.find(Motion).prop('style').height.val.should.equal(100);
        utilsDom.innerHeight.restore();
        done();
      }, 1000);
    });

  });
});
