import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import ForgotPasswordLink from 'components/login-modal/forgot-password-link';


describe('ForgotPasswordLink component', function () {
  it('should handle onClick', function () {
    const onClickSpy = spy();

    const wrapper = shallow(<ForgotPasswordLink onClick={ onClickSpy }/>);
    wrapper.find('ForgotPasswordLink').simulate('click');
    onClickSpy.calledOnce.should.be.true();
  });
});
