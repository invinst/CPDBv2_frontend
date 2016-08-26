import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import BackgroundColorTransition from 'components/animation/background-color-transition';


describe('BackgroundColorTransition component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render colorOut if transition is true', function (done) {
    instance = renderIntoDocument(
      <BackgroundColorTransition transition={ true } colorIn={ 'red' } colorOut={ 'blue' }>
        <div className='test-children' />
      </BackgroundColorTransition>
    );

    setTimeout(function () {
      let element = findRenderedDOMComponentWithClass(instance, 'test-children');
      element.parentNode.style.backgroundColor.should.equal('rgb(0, 0, 255)');
      done();
    }, 300);
  });

  it('should render colorIn if transition is false', function (done) {
    instance = renderIntoDocument(
      <BackgroundColorTransition transition={ false } colorIn={ 'red' } colorOut={ 'blue' }>
        <div className='test-children' />
      </BackgroundColorTransition>
    );

    setTimeout(function () {
      let element = findRenderedDOMComponentWithClass(instance, 'test-children');
      element.parentNode.style.backgroundColor.should.equal('rgb(255, 0, 0)');
      done();
    }, 300);
  });
});
