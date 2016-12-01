import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument, Simulate, findRenderedDOMComponentWithClass, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { stub, spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import LoginModal from 'components/login-modal';
import LoginModalButton from 'components/login-modal/login-modal-button';
import ForgotPasswordLink from 'components/login-modal/forgot-password-link';
import ForgotPasswordModal from 'components/login-modal/forgot-password-modal';


describe('LoginModal component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not show when showLoginModal is false', function () {
    instance = renderIntoDocument(<LoginModal showLoginModal={ false }/>);
    instance.should.displayNothing();
  });

  it('should focus name input when click on name input wrapper', function () {
    instance = renderIntoDocument(<LoginModal showLoginModal={ true }/>);
    stub(instance.nameInput, 'focus');
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'name-input-wrapper'));
    instance.nameInput.focus.calledOnce.should.be.true();
    instance.nameInput.focus.restore();
  });

  it('should focus password input when click on password input wrapper', function () {
    instance = renderIntoDocument(<LoginModal showLoginModal={ true }/>);
    stub(instance.passwordInput, 'focus');
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'password-input-wrapper'));
    instance.passwordInput.focus.calledOnce.should.be.true();
    instance.passwordInput.focus.restore();
  });

  it('sign up button should be disabled unless both inputs have value', function () {
    instance = renderIntoDocument(<LoginModal showLoginModal={ true }/>);
    instance.state.disabled.should.be.true();
    findRenderedComponentWithType(instance, LoginModalButton).props.disabled.should.be.true();

    instance.nameInput.value = 'abc';
    Simulate.change(instance.nameInput);
    instance.state.disabled.should.be.true();
    findRenderedComponentWithType(instance, LoginModalButton).props.disabled.should.be.true();

    instance.passwordInput.value = '123';
    Simulate.change(instance.passwordInput);
    instance.state.disabled.should.be.false();
    findRenderedComponentWithType(instance, LoginModalButton).props.disabled.should.be.false();

    instance.passwordInput.value = '';
    Simulate.change(instance.passwordInput);
    instance.state.disabled.should.be.true();
    findRenderedComponentWithType(instance, LoginModalButton).props.disabled.should.be.true();
  });

  it('should trigger onSignIn when click sign in button', function () {
    const onSignIn = spy();
    instance = renderIntoDocument(<LoginModal showLoginModal={ true } onSignIn={ onSignIn }/>);
    instance.nameInput.value = 'abc';
    Simulate.change(instance.nameInput);
    instance.passwordInput.value = '123';
    Simulate.change(instance.passwordInput);
    findRenderedComponentWithType(instance, LoginModalButton).props.onClick();
    onSignIn.calledWith({ username: 'abc', password: '123' }).should.be.true();
  });

  it('should trigger onSignIn when hit enter on password input', function () {
    const onSignIn = spy();
    instance = renderIntoDocument(<LoginModal showLoginModal={ true } onSignIn={ onSignIn }/>);
    instance.nameInput.value = 'abc';
    Simulate.change(instance.nameInput);
    instance.passwordInput.value = '123';
    Simulate.change(instance.passwordInput);
    Simulate.keyDown(instance.passwordInput, { key: 'Enter', keyCode: 13, which: 13 });
    onSignIn.calledWith({ username: 'abc', password: '123' }).should.be.true();
  });

  it('should trigger onForgotPassword when click on forgot password link', function () {
    const onForgotPassword = spy();
    instance = renderIntoDocument(<LoginModal showLoginModal={ true } onForgotPassword={ onForgotPassword }/>);
    findRenderedComponentWithType(instance, ForgotPasswordLink).props.onClick();
    onForgotPassword.calledOnce.should.be.true();
  });

  it('should show forgot password modal when showForgotPasswordModal is true', function () {
    instance = renderIntoDocument(<LoginModal showLoginModal={ true } showForgotPasswordModal={ true }/>);
    findRenderedComponentWithType(instance, ForgotPasswordModal).props.show.should.be.true();
  });

  it('should show login error message', function () {
    instance = renderIntoDocument(<LoginModal showLoginModal={ true } loginErrorMessage='abc'/>);
    findDOMNode(instance).innerText.should.match(/abc/);
  });

  it('should show login success message', function () {
    instance = renderIntoDocument(<LoginModal showLoginModal={ true } loginSuccessMessage='abc'/>);
    findDOMNode(instance).innerText.should.match(/abc/);
  });

  it('should show forgot password error message', function () {
    instance = renderIntoDocument(
      <LoginModal showLoginModal={ true } showForgotPasswordModal={ true } forgotPasswordErrorMessage='def'/>
    );
    findRenderedComponentWithType(instance, ForgotPasswordModal).props.errorMessage.should.eql('def');
  });
});
