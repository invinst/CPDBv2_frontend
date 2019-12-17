import React from 'react';
import { shallow } from 'enzyme';
import { StyleRoot } from 'radium';

import Spinner from 'components/animation/spinner';


describe('Spinner component', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<StyleRoot><Spinner/></StyleRoot>);
    wrapper.find(Spinner).exists().should.be.true();
  });
});
