import React from 'react';
import { shallow } from 'enzyme';

import JumpyMotion from 'components/animation/jumpy-motion';


describe('JumpyMotion component', function () {
  it('should render its children', function () {
    const wrapper = shallow(<JumpyMotion>abc</JumpyMotion>);
    wrapper.html().should.containEql('abc');
  });

  it('should set state startMotion to true if become active and change back quickly', function (done) {
    const wrapper = shallow(<JumpyMotion>abc</JumpyMotion>);
    wrapper.state('startMotion').should.be.false();

    wrapper.setProps({
      isActive: true,
    });
    wrapper.state('startMotion').should.be.true();
    setTimeout(() => {
      wrapper.state('startMotion').should.be.false();
      done();
    }, 20);
  });

  it('should set state startMotion to true when the component is focused second time', function (done) {
    const wrapper = shallow(<JumpyMotion isActive={ false }>abc</JumpyMotion>,);
    wrapper.setProps({ isActive: true });
    wrapper.state('startMotion').should.be.true();
    setTimeout(() => {
      wrapper.state('startMotion').should.be.false();
      wrapper.setProps({ isActive: false });
      wrapper.state('startMotion').should.be.false();
      wrapper.setProps({ isActive: true });
      wrapper.state('startMotion').should.be.true();
      done();
    }, 20);
  });
});
