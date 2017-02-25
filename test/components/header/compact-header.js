import React from 'react';
import { Motion } from 'react-motion';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError, withAnimationDisabled } from 'utils/test';
import * as utilsDom from 'utils/dom';
import CompactHeader from 'components/header/compact-header';
import HeaderContent from 'components/header/header-content';

describe('CompactHeader component', function () {
  let instance;
  let triggerScroll = () => {};

  beforeEach(function () {
    stub(utilsDom, 'windowAddEventListener', (evt, cb) => {
      if (evt === 'scroll') {
        triggerScroll = cb;
      }
    });
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    utilsDom.windowAddEventListener.restore();
  });

  context('animation disabled', function () {
    it('should render header without motion components', function () {
      withAnimationDisabled(() => {
        instance = renderIntoDocument(<CompactHeader/>);
        scryRenderedComponentsWithType(instance, HeaderContent).length.should.equal(1);
        scryRenderedComponentsWithType(instance, Motion).length.should.equal(0);
      });
    });
  });

  context('animation enabled', function () {
    it('should set state show to true when scrollY > 145', function () {
      instance = renderIntoDocument(<CompactHeader/>);
      window.scrollY = 146;
      triggerScroll();
      instance.state.show.should.be.true();
    });

    it('should set state show to false when scrollY < 145', function () {
      instance = renderIntoDocument(<CompactHeader/>);
      window.scrollY = 140;
      triggerScroll();
      instance.state.show.should.be.false();
    });

    it('should render HeaderContent within compact form', function () {
      instance = renderIntoDocument(<CompactHeader/>);
      scryRenderedComponentsWithType(instance, Motion).length.should.equal(1);
      const content = findRenderedComponentWithType(instance, HeaderContent);
      content.props.compact.should.be.true();
    });
  });
});
