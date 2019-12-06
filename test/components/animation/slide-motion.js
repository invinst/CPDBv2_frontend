import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';

import { withAnimationDisabled } from 'utils/test';
import SlideMotion from 'components/animation/slide-motion';


describe('SlideMotion component', function () {
  context('animation disabled', function () {
    it('should render children if show is true', function () {
      withAnimationDisabled(() => {
        const wrapper = shallow(<SlideMotion show={ true }><div/></SlideMotion>);
        wrapper.find('div').exists().should.be.true();
      });
    });

    it('should render nothing if show is false', function () {
      withAnimationDisabled(() => {
        const wrapper = shallow(<SlideMotion show={ false }><p/></SlideMotion>);
        should(wrapper.type()).be.null();
      });
    });
  });

  context('animation enabled', function () {
    it('should render nothing initially if show is false', function () {
      const wrapper = mount(<SlideMotion show={ false }><p/></SlideMotion>);
      wrapper.find('p').exists().should.be.false();
    });

    it('should slide children in eventually', function () {
      const wrapper = mount(
        <SlideMotion show={ false }><div/></SlideMotion>,
      );
      wrapper.find('div').exists().should.be.false();

      wrapper.setProps({
        show: true,
      });
      wrapper.find('div').exists().should.be.true()
    });
  });
});
