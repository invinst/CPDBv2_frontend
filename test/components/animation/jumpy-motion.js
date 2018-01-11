import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import JumpyMotion from 'components/animation/jumpy-motion';


describe('JumpyMotion component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render its children', function () {
    instance = renderIntoDocument(<JumpyMotion>abc</JumpyMotion>);
    findDOMNode(instance).textContent.should.containEql('abc');
  });

  it('should set state startMotion to true if become active and change back quickly', function (done) {
    instance = renderIntoDocument(<JumpyMotion>abc</JumpyMotion>);
    instance.state.startMotion.should.be.false();
    instance = reRender(<JumpyMotion isActive={ true }>abc</JumpyMotion>, instance);
    instance.state.startMotion.should.be.true();
    setTimeout(() => {
      instance.state.startMotion.should.be.false();
      done();
    }, 20);
  });
});
