import React from 'react';
import { render } from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';

import { unmountComponentSuppressError, withAnimationDisabled } from 'utils/test';
import SlideMotion from 'components/animation/slide-motion';


describe('SlideMotion component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  context('animation disabled', function () {
    it('should render children if show is true', function () {
      withAnimationDisabled(() => {
        instance = renderIntoDocument(<SlideMotion show={ true }><div/></SlideMotion>);
        findRenderedDOMComponentWithTag(instance, 'div');
      });
    });

    it('should render nothing if show is false', function () {
      withAnimationDisabled(() => {
        instance = renderIntoDocument(<SlideMotion show={ false }><p/></SlideMotion>);
        instance.should.displayNothing();
      });
    });
  });

  context('animation enabled', function () {
    it('should render nothing initially if show is false', function () {
      instance = renderIntoDocument(<SlideMotion show={ false }><p/></SlideMotion>);
      instance.should.displayNothing();
    });

    it('should slide children in eventually', function () {
      const rootEl = document.createElement('DIV');
      instance = render(
        <SlideMotion show={ false }><div/></SlideMotion>,
        rootEl
      );
      instance.should.displayNothing();

      instance = render(
        <SlideMotion show={ true }><div/></SlideMotion>,
        rootEl
      );
      instance.should.displaySomething();
    });
  });
});
