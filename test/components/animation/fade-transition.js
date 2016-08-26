import React from 'react';
import {
  renderIntoDocument, findRenderedDOMComponentWithClass, scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender, withAnimationDisabled } from 'utils/test';
import FadeTransition from 'components/animation/fade-transition';

describe('FadeTransition component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render it\'s children', function () {
    instance = renderIntoDocument(
      <FadeTransition>
        <div className='amazing-element' key='1'/>
      </FadeTransition>
    );
    findRenderedDOMComponentWithClass(instance, 'amazing-element');
  });

  it('should fade-in new child and fade-out old child', function (callback) {
    instance = renderIntoDocument(
      <FadeTransition>
        <div className='child1' key='1'/>
      </FadeTransition>
    );

    instance = reRender(
      <FadeTransition>
        <div className='child2' key='2'/>
      </FadeTransition>,
      instance);
    setTimeout(() => {
      findRenderedDOMComponentWithClass(instance, 'child1');
      findRenderedDOMComponentWithClass(instance, 'child2');
      setTimeout(() => {
        scryRenderedDOMComponentsWithClass(instance, 'child1').length.should.equal(0);
        findRenderedDOMComponentWithClass(instance, 'child2');
        callback();
      }, 500);
    },
    50);
  });

  it('should simply render it\'s children when animation is disabled', function () {
    withAnimationDisabled(() => {
      instance = renderIntoDocument(
        <FadeTransition>
          <div className='child' key='1'/>
        </FadeTransition>
      );
      findRenderedDOMComponentWithClass(instance, 'child');
    });
  });
});
