import React from 'react';
import { findDOMNode } from 'react-dom';
import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithTag,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy, stub, useFakeTimers } from 'sinon';
import { StyleRoot } from 'radium';
import * as intercomUtils from 'utils/intercom';

import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';


describe('RequestDocumentModalContent component', function () {
  let element;

  afterEach(function () {
    if (element) {
      unmountComponentSuppressError(element);
    }
  });

  it('should initial render form with text box and "Enter", "Cancel" button', function () {
    element = renderIntoDocument(
      <RequestDocumentModalContent/>
    );
    const domElement = findDOMNode(element);

    domElement.textContent.should.containEql('We’ll notify you when the document is made available');
    element.state.warning.should.be.false();
    let inputDOMElements = scryRenderedDOMComponentsWithTag(element, 'input');
    inputDOMElements[0].getAttribute('placeholder').should.be.eql('Your email');
    inputDOMElements[1].getAttribute('value').should.be.eql('Request');
    findRenderedDOMComponentWithTag(element, 'a').textContent.should.be.eql('Cancel');
  });

  it('should call closeEvent when click to Close link', function () {
    const cancelClickHandler = spy();
    element = renderIntoDocument(
      <RequestDocumentModalContent closeModal={ cancelClickHandler }/>
    );
    const cancelDomElement = findRenderedDOMComponentWithTag(element, 'a');
    cancelDomElement.textContent.should.be.eql('Cancel');
    Simulate.click(cancelDomElement);
    cancelClickHandler.calledOnce.should.be.true();
  });

  it('should show message if isRequested is true and have message', function () {
    element = renderIntoDocument(
      <RequestDocumentModalContent message={ 'Thanks you' } isRequested={ true } />
    );
    const messageBoxElement = findRenderedDOMComponentWithClass(element, 'test--request-document-modal--message');
    messageBoxElement.textContent.should.be.eql('Thanks you');
  });

  it('hide messageBox on startup but show if `warning` set to true; the email-input change background', function () {
    element = renderIntoDocument(
      <RequestDocumentModalContent message={ 'Thanks you' } />
    );
    scryRenderedDOMComponentsWithClass(element, 'test--request-document-modal--message').length.should.eql(0);
    element.setState({ warning: true });
    const messageBoxElement = findRenderedDOMComponentWithClass(element, 'test--request-document-modal--message');
    messageBoxElement.textContent.should.eql('Thanks you');

    // skip the alpha part, since this is round 0.1 ~ 0.0983...
    element.refs.email.style.backgroundColor.should.containEql('rgba(255, 96, 0');
  });

  describe('Submit', function () {
    let instance;
    let clock;
    let assertInCallbackTest;

    beforeEach(function () {
      clock = useFakeTimers();
      stub(intercomUtils, 'updateIntercomEmail');
    });

    afterEach(function () {
      clock.restore();
      if (instance) {
        unmountComponentSuppressError(instance);
      }
      intercomUtils.updateIntercomEmail.restore();
    });

    function submitRequestDocumentTest(assertInCallbackTest, done, fail=false) {
      const closeCallback = spy();
      const promise = new Promise((resolve, reject) => {
        if (fail) { reject(); }
        else { resolve(); }
      });
      let requestDocumentCallback = stub().returns(promise);
      let requestForm;

      const oldHandleSubmit = RequestDocumentModalContent.prototype.handleSubmit;
      RequestDocumentModalContent.prototype.handleSubmit = function (event) {
        event.preventDefault = spy();

        const temp = oldHandleSubmit.call(this, event);
        event.preventDefault.calledOnce.should.be.true();
        temp.then(() => {
          assertInCallbackTest(requestForm);
          RequestDocumentModalContent.prototype.handleSubmit = oldHandleSubmit;
        }).then(done);
      };

      instance = renderIntoDocument(
        <StyleRoot>
          <RequestDocumentModalContent
            message={ 'Default message' }
            id={ 1 }
            closeModal={ closeCallback }
            onRequestDocument={ requestDocumentCallback }
          />
        </StyleRoot>);

      requestForm = findRenderedComponentWithType(instance, RequestDocumentModalContent);
      requestForm.state.warning.should.be.false();
      let emailElement = requestForm.refs.email;
      emailElement.value = 'abc@xyz.com';
      Simulate.change(emailElement);
      let formElement = findRenderedDOMComponentWithTag(requestForm, 'form');
      Simulate.submit(formElement);

      requestDocumentCallback.calledWith({ id: 1, email: 'abc@xyz.com' }).should.be.true();
    }

    // TODO: BUG - when one case failed, then other case failed as well !
    it('- invalid email, should set "warning" state to true, show the messageBox', function (done) {

      assertInCallbackTest = function (requestForm) {
        requestForm.state.should.containEql( { warning: true } );

        const messageBoxElement = findRenderedDOMComponentWithClass(requestForm,
          'test--request-document-modal--message');
        messageBoxElement.textContent.should.be.eql('Default message');
        intercomUtils.updateIntercomEmail.called.should.be.false();
      };
      submitRequestDocumentTest(assertInCallbackTest, done, true);
    });

    it('- valid email, should set "warning" state as false and call closeModal after 1.5s', function (done) {
      assertInCallbackTest = function (requestForm) {
        requestForm.state.should.containEql( { warning: false } );
        requestForm.props.closeModal.called.should.be.false();
        clock.tick(1550);
        requestForm.props.closeModal.calledOnce.should.be.true();
        intercomUtils.updateIntercomEmail.calledWith('abc@xyz.com').should.be.true();
      };
      submitRequestDocumentTest(assertInCallbackTest, done);
    });
  });
});
