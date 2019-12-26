import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';
import should from 'should';

import LoginModalButton from 'components/login-modal/login-modal-button';
import ForgotPasswordModal from 'components/login-modal/forgot-password-modal';


describe('ForgotPasswordModal component', function () {
  it('should not show when show is false', function () {
    const wrapper = mount(<ForgotPasswordModal show={ false }/>);
    should(wrapper.html()).be.null();
  });

  it('should be disabled on receiving show false', function () {
    const wrapper = shallow(<ForgotPasswordModal show={ true }/>);
    wrapper.setState({ disabled: false });
    wrapper.state('disabled').should.be.false();
    wrapper.setProps({ show: false });
    wrapper.state('disabled').should.be.true();
  });

  it('should focus email input when click on email input wrapper', function () {
    const wrapper = mount(<ForgotPasswordModal show={ true }/>);
    const instance = wrapper.instance();
    stub(instance.emailInput, 'focus');
    wrapper.find('.email-input-wrapper').simulate('click');

    instance.emailInput.focus.calledOnce.should.be.true();
    instance.emailInput.focus.restore();
  });

  it('sign up button should be disabled unless email input have value', function () {
    const wrapper = mount(<ForgotPasswordModal show={ true }/>);
    wrapper.state('disabled').should.be.true();

    wrapper.find(LoginModalButton).prop('disabled').should.be.true();

    wrapper.instance().emailInput.value = 'abc';
    wrapper.find('input').simulate('change', { target: { value: 'abc' } });
    wrapper.find(LoginModalButton).prop('disabled').should.be.false();
  });

  it('should trigger onResetPassword when press enter', function () {
    const onResetPasswordSpy = spy();
    const wrapper = mount(<ForgotPasswordModal show={ true } onResetPassword={ onResetPasswordSpy }/>);

    wrapper.instance().emailInput.value = 'abc';
    wrapper.find('input').simulate('change', { target: { value: 'abc' } });
    wrapper.find('input').simulate('keyDown', { keyCode: 13 });
    onResetPasswordSpy.should.be.calledWith({ email: 'abc' });
  });

  it('should trigger onResetPassword when click reset password button', function () {
    const onResetPasswordSpy = spy();
    const wrapper = mount(<ForgotPasswordModal show={ true } onResetPassword={ onResetPasswordSpy }/>);

    wrapper.instance().emailInput.value = 'abc';
    wrapper.find('input').simulate('change', { target: { value: 'abc' } });
    wrapper.find(LoginModalButton).prop('onClick')();
    onResetPasswordSpy.should.be.calledWith({ email: 'abc' });
  });

  it('should show forgot password error message', function () {
    const wrapper = shallow(
      <ForgotPasswordModal show={ true } errorMessage='Error message'/>
    ).dive().dive();
    wrapper.text().should.containEql('Error message');
  });
});
