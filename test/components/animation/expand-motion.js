import React from 'react';
import { findDOMNode } from 'react-dom';
import { stub } from 'sinon';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';

import { unmountComponentSuppressError, withAnimationDisabled } from 'utils/test';
import * as utilsDom from 'utils/dom';
import ExpandMotion from 'components/animation/expand-motion';


describe('ExpandMotion component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  context('animation disabled', function () {
    it('should render children if show is true', function () {
      withAnimationDisabled(() => {
        instance = renderIntoDocument(<ExpandMotion show={ true }><div/></ExpandMotion>);
        findRenderedDOMComponentWithTag(instance, 'div');
      });
    });

    it('should render nothing if show is false', function () {
      withAnimationDisabled(() => {
        instance = renderIntoDocument(<ExpandMotion show={ false }><p/></ExpandMotion>);
        instance.should.displayNothing();
      });
    });
  });

  context('animation enabled', function () {
    it('should render nothing initially if show is false', function () {
      instance = renderIntoDocument(<ExpandMotion show={ false }><p/></ExpandMotion>);
      instance.should.displayNothing();
    });

    it('should render chilren in full height eventually', function (done) {
      stub(utilsDom, 'innerHeight').returns(100);
      instance = renderIntoDocument(
        <ExpandMotion show={ true }><div/></ExpandMotion>
      );
      setTimeout(() => {
        instance.state.childHeight.should.eql(100);
        const div = findDOMNode(instance);
        div.style.height.should.eql('100px');
        utilsDom.innerHeight.restore();
        done();
      }, 1000);
    });

  });
});
