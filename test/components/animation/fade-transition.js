import React from 'react';
import { mount } from 'enzyme';

import { withAnimationDisabled } from 'utils/test';
import FadeTransition from 'components/animation/fade-transition';


describe('FadeTransition component', function () {
  it('should render its children', function () {
    const wrapper = mount(
      <FadeTransition>
        <div className='amazing-element' key='1'/>
      </FadeTransition>
    );
    wrapper.find('.amazing-element').exists().should.be.true();
  });

  it('should fade-in new child and fade-out old child', function (callback) {
    const wrapper = mount(
      <FadeTransition>
        <div className='child1' key='1'/>
      </FadeTransition>
    );

    wrapper.setProps({
      children: <div className='child2' key='2'/>,
    });

    setTimeout(() => {
      wrapper.find('.child1').exists().should.be.true();
      wrapper.find('.child2').exists().should.be.true();
      setTimeout(() => {
        wrapper.find('.child1').exists().should.be.false();
        wrapper.find('.child2').exists().should.be.true();
        callback();
      }, 500);
    },
    50);
  });

  it('should simply render it\'s children when animation is disabled', function () {
    withAnimationDisabled(() => {
      const wrapper = mount(
        <FadeTransition>
          <div className='child' key='1'/>
        </FadeTransition>
      );
      wrapper.find('.child').exists().should.be.true();
    });
  });
});
