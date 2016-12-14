import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
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

  it('should render HeaderContent in compact form', function () {
    instance = renderIntoDocument(<CompactHeader/>);
    const content = findRenderedComponentWithType(instance, HeaderContent);
    content.props.compact.should.be.true();
  });
});
