import React from 'react';
import { Motion } from 'react-motion';
import {
  renderIntoDocument, scryRenderedComponentsWithType, scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, withAnimationDisabled } from 'utils/test';
import FadeMotion from 'components/animation/fade-motion';


describe('FadeMotion components', function () {
  let instance;
  const children = () => <div className='test--sample-div' />;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  context('animation disabled', function () {
    it('should render nothing if its show property is false', function () {
      withAnimationDisabled(() => {
        instance = renderIntoDocument(
          <FadeMotion show={ false } children={ children } />
        );

        scryRenderedDOMComponentsWithClass(instance, 'test--sample-div').length.should.equal(0);
      });
    });

    it('shoulf render children if its show property is true', function () {
      withAnimationDisabled(() => {
        instance = renderIntoDocument(
          <FadeMotion show={ true } children={ children } />
        );

        scryRenderedDOMComponentsWithClass(instance, 'test--sample-div').length.should.equal(1);
      });
    });
  });

  context('animation enabled', function () {
    it('should render Motion component', function () {
      instance = renderIntoDocument(
        <FadeMotion show={ true } children={ children } />
      );

      scryRenderedComponentsWithType(instance, Motion).length.should.equal(1);
    });
  });
});
