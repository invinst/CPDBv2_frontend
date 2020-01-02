import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import { Link } from 'react-router';

import HoverableLink from 'components/common/hoverable-link';


describe('HoverableLink component', function () {
  const style = { base: {}, hover: {} };

  it('should render tag a when href is available', function () {
    const wrapper = mount(<HoverableLink href='http://link.com' style={ style }/>);
    wrapper.find('a').exists().should.be.true();
  });

  it('should render Link a when href is not available', function () {
    const wrapper = mount(<HoverableLink to='/internal/link/' style={ style }/>);
    wrapper.find(Link).exists().should.be.true();
  });

  it('should trigger stopPropagation event when click', function () {
    const dummyEvent = {
      stopPropagation: stub(),
    };
    const wrapper = mount(<HoverableLink href='http://cpdb.lvh.me/' style={ style } />);
    const link = wrapper.find('.link--transition');
    link.simulate('click', dummyEvent);
    dummyEvent.stopPropagation.should.be.called();
  });
});
