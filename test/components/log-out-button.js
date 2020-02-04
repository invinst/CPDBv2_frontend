import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import should from 'should';

import LogOutButton from 'components/log-out-button';
import { HoverableButton } from 'components/common/hoverable-button';


describe('LogOutButton component', function () {
  it('should render log out button if its show property is true', function () {
    const wrapper = shallow(
      <LogOutButton show={ true } />
    );
    wrapper.exists().should.be.true();
  });

  it('should not render anything if its show property is false', function () {
    const wrapper = shallow(
      <LogOutButton show={ false } />
    );
    should(wrapper.type()).be.null();
  });

  it('should handle on click', function () {
    const logOut = sinon.spy();
    const wrapper = mount(
      <LogOutButton show={ true } logOut={ logOut } />
    );

    const logOutButton = wrapper.find(HoverableButton);
    logOutButton.prop('onClick')();

    logOut.should.be.called();
  });
});
