import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OutboundLink from 'components/common/outbound-link';
import * as GATracking from 'utils/google_analytics_tracking';


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
    stub(GATracking, 'trackOutboundLink');
    instance = renderIntoDocument(<OutboundLink href='abc' target='_blank'/>);
    const link = findDOMNode(instance);

    Simulate.click(link);

    GATracking.trackOutboundLink.calledWith('abc', '_blank').should.be.true();
    GATracking.trackOutboundLink.restore();
  });
});
