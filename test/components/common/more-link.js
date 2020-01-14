import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router-dom';

import MoreLink from 'components/common/more-link';


describe('MoreLink component', function () {
  it('should return a react router link if `to` is valid', function () {
    const wrapper = mount(<MoreLink to='/foo' />);
    wrapper.find(Link).exists().should.be.true();
  });

  it('should return <a> if `to` is not provided', function () {
    const wrapper = mount(<MoreLink />);
    wrapper.find('a').exists().should.be.true();
  });
});
