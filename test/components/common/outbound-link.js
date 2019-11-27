import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import OutboundLink from 'components/common/outbound-link';
import * as GATracking from 'utils/google_analytics_tracking';


describe('OutboundLink component', function () {
  it('should call trackOutboundLink when clicked', function () {
    stub(GATracking, 'trackOutboundLink');
    const wrapper = mount(<OutboundLink href='abc' target='_blank'/>);

    wrapper.simulate('click');

    GATracking.trackOutboundLink.should.be.calledWith('abc', '_blank');
    GATracking.trackOutboundLink.restore();
  });
});
