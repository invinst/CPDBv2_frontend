import React from 'react';
import { mount } from 'enzyme';

import BackgroundColorTransition from 'components/animation/background-color-transition';


describe('BackgroundColorTransition component', function () {
  it('should render colorOut if transition is true', function (done) {
    const wrapper = mount(
      <BackgroundColorTransition transition={ true } colorIn={ 'red' } colorOut={ 'blue' }>
        <div className='test-children' />
      </BackgroundColorTransition>
    );

    setTimeout(function () {
      let element = wrapper.find('.test-children');
      element.getDOMNode().parentNode.style.backgroundColor.should.equal('rgb(0, 0, 255)');
      done();
    }, 300);
  });

  it('should render colorIn if transition is false', function (done) {
    const wrapper = mount(
      <BackgroundColorTransition transition={ false } colorIn={ 'red' } colorOut={ 'blue' }>
        <div className='test-children' />
      </BackgroundColorTransition>
    );

    setTimeout(function () {
      let element = wrapper.find('.test-children');
      element.getDOMNode().parentNode.style.backgroundColor.should.equal('rgb(255, 0, 0)');
      done();
    }, 300);
  });
});
