import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OutboundLink from 'components/common/outbound-link';
import * as trackingUtils from 'utils/tracking';


describe('OutboundLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    instance = renderIntoDocument(<OutboundLink />);
    OutboundLink.should.be.renderable();
  });

  it('should call trackOutboundLink when clicked', function () {
    stub(trackingUtils, 'trackOutboundLink');
    instance = renderIntoDocument(<OutboundLink href='abc' target='_blank'/>);
    const link = findDOMNode(instance);

    Simulate.click(link);

    trackingUtils.trackOutboundLink.calledWith('abc', '_blank').should.be.true();
    trackingUtils.trackOutboundLink.restore();
  });
});
