import React from 'react';
import { stub } from 'sinon';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CompactHeader from 'components/header/compact-header';
import HeaderContent from 'components/header/header-content';

describe('CompactHeader component', function () {
  let instance;
  let callback;

  beforeEach(function () {
    stub(window, 'addEventListener', (evt, cb) => {
      if (evt === 'scroll') {
        callback = cb;
      }
    });
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    window.addEventListener.restore();
  });

  it('should set state show to true when scrollY > 145', function () {
    instance = renderIntoDocument(<CompactHeader/>);
    window.scrollY = 146;
    callback();
    instance.state.show.should.be.true();
  });

  it('should set state show to false when scrollY < 145', function () {
    instance = renderIntoDocument(<CompactHeader/>);
    window.scrollY = 140;
    callback();
    instance.state.show.should.be.false();
  });

  it('should render HeaderContent in compact form', function () {
    instance = renderIntoDocument(<CompactHeader/>);
    const content = findRenderedComponentWithType(instance, HeaderContent);
    content.props.compact.should.be.true();
  });
});
