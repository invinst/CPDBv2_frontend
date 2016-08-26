import React from 'react';
import {
  renderIntoDocument, Simulate, findRenderedDOMComponentWithTag, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import { StyleRoot } from 'radium';

import { unmountComponentSuppressError } from 'utils/test';
import SubscribeForm from 'components/landing-page/vftg-section/subscribe-form';
import { withAnimationDisabled } from 'utils/test';
import { FORM_INITIAL, FORM_LOADING, FORM_SUCCESS, FORM_FAILURE } from 'utils/constants';


describe('SubscribeForm component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SubscribeForm.should.be.renderable();
  });

  function changeInput(subscribeForm) {
    const input = findRenderedDOMComponentWithTag(subscribeForm, 'input');
    input.value = 'abc@abc.abc';
    Simulate.change(input);
  }

  function testSubscribeEmailShouldChangeState(expectedState, callback, fail=false) {
    const promise = new Promise((resolve, reject) => {
      if (fail) {
        reject();
      } else {
        resolve();
      }
    });
    let subscribeEmail = stub().returns(promise);
    let subscribeForm;

    const oldHandleClick = SubscribeForm.prototype.handleClick;
    SubscribeForm.prototype.handleClick = function (event) {
      const temp = oldHandleClick.apply(this, event);
      temp.then(() => {
        subscribeForm.state.state.should.equal(expectedState);
        SubscribeForm.prototype.handleClick = oldHandleClick;
        callback();
      });
    };

    withAnimationDisabled(() => {
      instance = renderIntoDocument(
        <StyleRoot>
          <SubscribeForm subscribeEmail={ subscribeEmail }/>
        </StyleRoot>);

      subscribeForm = findRenderedComponentWithType(instance, SubscribeForm);
      changeInput(subscribeForm);
      const button = findRenderedDOMComponentWithTag(subscribeForm, 'button');
      Simulate.click(button);
      subscribeForm.state.should.be.ok();
      subscribeEmail.calledWith('abc@abc.abc').should.be.true();
      subscribeForm.state.state.should.equal(FORM_LOADING);
    });
  }

  it('should handle subscribe email success', function (callback) {
    testSubscribeEmailShouldChangeState(FORM_SUCCESS, callback);
  });

  it('should handle subscribe email failure', function (callback) {
    testSubscribeEmailShouldChangeState(FORM_FAILURE, callback, true);
  });

  function testShouldChangeStateToInitial(formerState) {
    instance = renderIntoDocument(<SubscribeForm/>);
    instance.setState({ 'state': formerState });
    changeInput(instance);
    instance.state.state.should.equal(FORM_INITIAL);
  }

  it('should change back to initial when success and input change', function () {
    testShouldChangeStateToInitial(FORM_SUCCESS);
  });

  it('should change back to initial when success and input change', function () {
    testShouldChangeStateToInitial(FORM_FAILURE);
  });
});
