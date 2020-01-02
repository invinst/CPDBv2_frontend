import React from 'react';
import should from 'should';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import NavLink from 'components/common/nav-link';


describe('NavLink component', function () {
  it('should render', function () {
    NavLink.should.be.renderable({ href: '/path' });
  });

  it('should have bold text when isActive is true', function () {
    const wrapper = shallow(
      <NavLink isActive={ true } href='/'/>
    );
    let element = wrapper.find(Link);
    element.prop('style').fontWeight.should.equal('bold');
  });

  it('should not have bold text when isActive is false', function () {
    const wrapper = shallow(
      <NavLink isActive={ false } href='/'/>
    );
    let element = wrapper.find(Link);
    should(element.prop('style').fontWeight).not.equal('bold');
  });
});
