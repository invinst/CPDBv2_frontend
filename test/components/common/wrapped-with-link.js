import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import WrappedWithLink from 'components/common/wrapped-with-link';
import OutboundLink from 'components/common/outbound-link';


describe('WrappedWithLink component', function () {
  it('should render Link when to is passed', function () {
    const wrapper = shallow(
      <WrappedWithLink
        to={ '/some/internal/link' }
        className='internal-link'
      >
        <div className='test--wrapped-with-link-child'/>
      </WrappedWithLink>
    );

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/some/internal/link');
    link.prop('className').should.equal('internal-link');
    wrapper.find('.test--wrapped-with-link-child').exists().should.be.true();
  });

  it('should render OutboundLink when url is passed', function () {
    const wrapper = shallow(
      <WrappedWithLink
        url={ '/some/external/link' }
        className='external-link'
      >
        <div className='test--wrapped-with-link-child'/>
      </WrappedWithLink>
    );

    const link = wrapper.find(OutboundLink);
    link.prop('href').should.equal('/some/external/link');
    link.prop('className').should.equal('external-link');
    wrapper.find('.test--wrapped-with-link-child').exists().should.be.true();
  });

  it('should render div when to or url are not passed', function () {
    const wrapper = shallow(
      <WrappedWithLink
        className='normal-div'
      >
        <span className='test--wrapped-with-link-child'/>
      </WrappedWithLink>
    );

    wrapper.find('div').prop('className').should.equal('normal-div');
    wrapper.find('.test--wrapped-with-link-child').exists().should.be.true();
  });
});
