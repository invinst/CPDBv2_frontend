import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';

import OutboundLink from 'components/common/outbound-link';
import * as tracking from 'utils/tracking';


describe('OutboundLink component', function () {
  it('should call trackOutboundLink when clicked', function () {
    stub(tracking, 'trackOutboundLink');
    const wrapper = mount(<OutboundLink href='abc' target='_blank'/>);

    wrapper.simulate('click');

    tracking.trackOutboundLink.should.be.calledWith('abc', '_blank');
    tracking.trackOutboundLink.restore();
  });
});
