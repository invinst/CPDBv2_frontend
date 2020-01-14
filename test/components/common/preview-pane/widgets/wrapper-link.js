import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import OutboundLink from 'components/common/outbound-link';
import WrapperLink from 'components/common/preview-pane/widgets/wrapper-link';


describe('WrapperLink component', () => {
  it('should contain a Link component when it has `to` property', () => {
    const wrapper = shallow(
      <WrapperLink to='officer/1/'/>
    );
    wrapper.find(Link).prop('to').should.equal('officer/1/');
  });

  it('should contain a OutboundLink component when it has `to` property', () => {
    const wrapper = shallow(
      <WrapperLink url='something.co'/>
    );
    wrapper.find(OutboundLink).prop('href').should.equal('something.co');
  });

  it('should render children without any wrapper if there is no url or to', function () {
    const wrapper = shallow(
      <WrapperLink>
        <div className='test--child-element'/>
      </WrapperLink>
    );
    wrapper.find(OutboundLink).exists().should.be.false();
    wrapper.find(Link).exists().should.be.false();

    wrapper.prop('className').should.equal('test--child-element');
  });
});
