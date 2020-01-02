import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub, spy } from 'sinon';

import LoginModal from 'components/login-modal';
import LoginModalButton from 'components/login-modal/login-modal-button';
import ForgotPasswordLink from 'components/login-modal/forgot-password-link';
import ForgotPasswordModal from 'components/login-modal/forgot-password-modal';


describe('LoginModal component', function () {
  it('should not show when showLoginModal is false', function () {
    const wrapper = shallow(<LoginModal showLoginModal={ false }/>);
    wrapper.children().exists().should.be.false();
  });

  it('should focus name input when click on name input wrapper', function () {
    const wrapper = mount(<LoginModal showLoginModal={ true }/>);
    const instance = wrapper.instance();
    stub(instance.nameInput, 'focus');
    wrapper.find('.name-input-wrapper').simulate('click');
    instance.nameInput.focus.calledOnce.should.be.true();
    instance.nameInput.focus.restore();
  });

  it('should focus password input when click on password input wrapper', function () {
    const wrapper = mount(<LoginModal showLoginModal={ true }/>);
    const instance = wrapper.instance();
    stub(instance.passwordInput, 'focus');
    wrapper.find('.password-input-wrapper').simulate('click');
    instance.passwordInput.focus.calledOnce.should.be.true();
    instance.passwordInput.focus.restore();
  });

  it('sign up button should be disabled unless both inputs have value', function () {
    const wrapper = mount(<LoginModal showLoginModal={ true }/>);
    wrapper.state('disabled').should.be.true();
    wrapper.find(LoginModalButton).prop('disabled').should.be.true();
    const instance = wrapper.instance();

    instance.nameInput.value = 'abc';
    wrapper.find('.name-input-wrapper input').simulate('change', { target: { value: 'abc' } });
    wrapper.state('disabled').should.be.true();
    wrapper.find(LoginModalButton).prop('disabled').should.be.true();

    instance.passwordInput.value = '123';
    wrapper.find('.password-input-wrapper input').simulate('change', { target: { value: '123' } });
    wrapper.state('disabled').should.be.false();
    wrapper.find(LoginModalButton).prop('disabled').should.be.false();

    instance.passwordInput.value = '';
    wrapper.find('.password-input-wrapper input').simulate('change', { target: { value: '' } });
    wrapper.state('disabled').should.be.true();
    wrapper.find(LoginModalButton).prop('disabled').should.be.true();
  });

  it('should trigger onSignIn when click sign in button', function () {
    const onSignIn = spy();
    const wrapper = mount(<LoginModal showLoginModal={ true } onSignIn={ onSignIn }/>);
    const instance = wrapper.instance();

    instance.nameInput.value = 'abc';
    wrapper.find('.name-input-wrapper input').simulate('change', { target: { value: 'abc' } });
    instance.passwordInput.value = '123';
    wrapper.find('.password-input-wrapper input').simulate('change', { target: { value: '123' } });
    wrapper.find(LoginModalButton).prop('onClick')();
    onSignIn.should.be.calledWith({ username: 'abc', password: '123' });
  });

  it('should trigger onSignIn when hit enter on password input', function () {
    const onSignIn = spy();
    const wrapper = mount(<LoginModal showLoginModal={ true } onSignIn={ onSignIn }/>);
    const instance = wrapper.instance();

    instance.nameInput.value = 'abc';
    wrapper.find('.name-input-wrapper input').simulate('change', { target: { value: 'abc' } });
    instance.passwordInput.value = '123';
    wrapper.find('.password-input-wrapper input').simulate('change', { target: { value: '123' } });
    wrapper.find('.password-input-wrapper input').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
    onSignIn.should.be.calledWith({ username: 'abc', password: '123' });
  });

  it('should trigger onForgotPassword when click on forgot password link', function () {
    const onForgotPassword = spy();
    const wrapper = shallow(
      <LoginModal showLoginModal={ true } onForgotPassword={ onForgotPassword }/>
    ).dive().dive();
    wrapper.find(ForgotPasswordLink).prop('onClick')();
    onForgotPassword.calledOnce.should.be.true();
  });

  it('should show forgot password modal when showForgotPasswordModal is true', function () {
    const wrapper = shallow(
      <LoginModal showLoginModal={ true } showForgotPasswordModal={ true }/>
    ).dive().dive();
    wrapper.find(ForgotPasswordModal).prop('show').should.be.true();
  });

  it('should show login error message', function () {
    const wrapper = shallow(
      <LoginModal showLoginModal={ true } loginErrorMessage='abc'/>
    ).dive().dive();
    wrapper.text().should.match(/abc/);
  });

  it('should show login success message', function () {
    const wrapper = shallow(
      <LoginModal showLoginModal={ true } loginSuccessMessage='abc'/>
    ).dive().dive();
    wrapper.text().should.match(/abc/);
  });

  it('should show forgot password error message', function () {
    const wrapper = shallow(
      <LoginModal showLoginModal={ true } showForgotPasswordModal={ true } forgotPasswordErrorMessage='def'/>
    ).dive().dive();
    wrapper.find(ForgotPasswordModal).prop('errorMessage').should.equal('def');
  });
});
