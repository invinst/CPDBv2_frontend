import React from 'react';
import { shallow } from 'enzyme';

import JumpyMotion from 'components/animation/jumpy-motion';


describe('JumpyMotion component', function () {
  it('should render its children', function () {
    const wrapper = shallow(<JumpyMotion>abc</JumpyMotion>).dive();
    wrapper.text().should.containEql('abc');
  });

  it('should set state startMotion to true if become active and change back quickly', function (done) {
    const wrapper = shallow(
      <JumpyMotion>abc</JumpyMotion>,
      { disableLifecycleMethods: false }
    );
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
});
