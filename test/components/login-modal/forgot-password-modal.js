import React from 'react';
import { render } from 'react-dom';
import {
  renderIntoDocument, Simulate, findRenderedDOMComponentWithClass, findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { stub, spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import LoginModalButton from 'components/login-modal/login-modal-button';
import ForgotPasswordModal from 'components/login-modal/forgot-password-modal';


describe('ForgotPasswordModal component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not show when showLoginModal is false', function () {
    instance = renderIntoDocument(<ForgotPasswordModal show={ false }/>);
    instance.should.displayNothing();
  });

  it('should be disabled on receiving show false', function () {
    const rootEl = document.createElement('DIV');
    instance = render(<ForgotPasswordModal show={ true }/>, rootEl);
    instance.setState({ disabled: false });
    instance = render(<ForgotPasswordModal show={ false }/>, rootEl);
    instance.state.disabled.should.be.true();
  });

  it('should focus email input when click on email input wrapper', function () {
    instance = renderIntoDocument(<ForgotPasswordModal show={ true }/>);
    stub(instance.emailInput, 'focus');
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'email-input-wrapper'));
    instance.emailInput.focus.calledOnce.should.be.true();
    instance.emailInput.focus.restore();
  });

  it('sign up button should be disabled unless email input have value', function () {
    instance = renderIntoDocument(<ForgotPasswordModal show={ true }/>);
    instance.state.disabled.should.be.true();
    findRenderedComponentWithType(instance, LoginModalButton).props.disabled.should.be.true();

    instance.emailInput.value = 'abc';
    Simulate.change(instance.emailInput);
    findRenderedComponentWithType(instance, LoginModalButton).props.disabled.should.be.false();
  });

  it('should trigger onResetPassword when press enter', function () {
    const onResetPasswordSpy = spy();
    instance = renderIntoDocument(<ForgotPasswordModal show={ true } onResetPassword={ onResetPasswordSpy }/>);
    instance.emailInput.value = 'abc';
    Simulate.change(instance.emailInput);
    Simulate.keyDown(instance.emailInput, { keyCode: 13 });
    onResetPasswordSpy.calledWith({ email: 'abc' }).should.be.true();
  });

  it('should trigger onResetPassword when click reset password button', function () {
    const onResetPasswordSpy = spy();
    instance = renderIntoDocument(<ForgotPasswordModal show={ true } onResetPassword={ onResetPasswordSpy }/>);
    instance.emailInput.value = 'abc';
    Simulate.change(instance.emailInput);
    findRenderedComponentWithType(instance, LoginModalButton).props.onClick();
    onResetPasswordSpy.calledWith({ email: 'abc' }).should.be.true();
  });

  it('should show forgot password error message', function () {
    instance = renderIntoDocument(
      <ForgotPasswordModal show={ true } errorMessage='def'/>
    );
    findRenderedComponentWithType(instance, ForgotPasswordModal).props.errorMessage.should.eql('def');
  });
});
