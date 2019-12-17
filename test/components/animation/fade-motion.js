import React from 'react';
import { shallow } from 'enzyme';
import { Motion } from 'react-motion';

import { withAnimationDisabled } from 'utils/test';
import FadeMotion from 'components/animation/fade-motion';


describe('FadeMotion components', function () {
  const children = () => <div className='test--sample-div' />;

  context('animation disabled', function () {
    it('should render nothing if its show property is false', function () {
      withAnimationDisabled(() => {
        const wrapper = shallow(
          <FadeMotion show={ false } children={ children } />
        );

        wrapper.find('.test--sample-div').exists().should.be.false();
      });
    });

    it('should render children if its show property is true', function () {
      withAnimationDisabled(() => {
        const wrapper = shallow(
          <FadeMotion show={ true } children={ children } />
        );

        wrapper.find('.test--sample-div').exists().should.be.true();
      });
    });
  });

  context('animation enabled', function () {
    it('should render Motion component', function () {
      const wrapper = shallow(
        <FadeMotion show={ true } children={ children } />
      );

      wrapper.find(Motion).exists().should.be.true();
    });
  });
});
