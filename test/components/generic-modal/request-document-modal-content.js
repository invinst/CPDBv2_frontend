import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import * as intercomUtils from 'utils/intercom';

import RequestDocumentModalContent from 'components/generic-modal/request-document-modal-content';
import { buildEditStateFields } from 'utils/test/factories/draft';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


describe('RequestDocumentModalContent component', function () {
  it('should initial render form with text box for request document button', function () {
    const instructionEditWrapperStateProps = {
      fields: buildEditStateFields({
        'document_request_instruction': ['We’ll notify you when the document is made available.'],
      }),
      sectionEditModeOn: false,
      onSaveForm: sinon.spy(),
      turnOnSectionEditMode: sinon.spy(),
      turnOffSectionEditMode: sinon.spy(),
    };
    const wrapper = mount(
      <RequestDocumentModalContent
        instructionEditWrapperStateProps={ instructionEditWrapperStateProps }
        hasData={ false }
      />
    );

    wrapper.text().should.containEql('We’ll notify you when the document is made available.');
    wrapper.state('warning').should.be.false();
    let inputDOMElements = wrapper.find('input');
    inputDOMElements.at(0).prop('placeholder').should.equal('Your email');
    inputDOMElements.at(1).prop('value').should.equal('Request');
    wrapper.find('a').text().should.equal('Cancel');

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);
    const editableNoDocumentText = hoverableEditWrapper.find(RichTextEditable);
    editableNoDocumentText.prop('fieldname').should.equal('document_request_instruction');
  });

  it('should initial render form with text box for new document notifications button', function () {
    const instructionEditWrapperStateProps = {
      fields: buildEditStateFields({
        'new_document_notification': ['We’ll notify you when we have new documents.'],
      }),
      sectionEditModeOn: false,
      onSaveForm: sinon.spy(),
      turnOnSectionEditMode: sinon.spy(),
      turnOffSectionEditMode: sinon.spy(),
    };
    const wrapper = mount(
      <RequestDocumentModalContent
        instructionEditWrapperStateProps={ instructionEditWrapperStateProps }
        hasData={ true }
      />
    );

    wrapper.text().should.containEql('We’ll notify you when we have new documents.');
    wrapper.state('warning').should.be.false();
    let inputDOMElements = wrapper.find('input');
    inputDOMElements.at(0).prop('placeholder').should.equal('Your email');
    inputDOMElements.at(1).prop('value').should.equal('Request');
    wrapper.find('a').text().should.equal('Cancel');

    const editWrapperStateProvider = wrapper.find(EditWrapperStateProvider);
    const hoverableEditWrapper = editWrapperStateProvider.find(HoverableEditWrapper);
    const editableNoDocumentText = hoverableEditWrapper.find(RichTextEditable);
    editableNoDocumentText.prop('fieldname').should.equal('new_document_notification');
  });

  it('should call closeEvent when click to Close link', function () {
    const cancelClickHandler = sinon.spy();
    const wrapper = mount(
      <RequestDocumentModalContent closeModal={ cancelClickHandler }/>
    );
    const cancelDomElement = wrapper.find('a');
    cancelDomElement.text().should.equal('Cancel');
    cancelDomElement.simulate('click');
    cancelClickHandler.calledOnce.should.be.true();
  });

  it('should show message if isRequested is true and have message', function () {
    const wrapper = mount(
      <RequestDocumentModalContent message={ 'Thanks you' } isRequested={ true } />
    );
    const messageBoxElement = wrapper.find('.request-document-message-box');
    messageBoxElement.text().should.equal('Thanks you');
  });

  it('hide messageBox on startup but show if `warning` set to true; the email-input change background', function () {
    const wrapper = mount(
      <RequestDocumentModalContent message={ 'Thanks you' } />
    );
    wrapper.find('.request-document-message-box').exists().should.be.false();
    wrapper.setState({ warning: true });
    const messageBoxElement = wrapper.find('.request-document-message-box');
    messageBoxElement.text().should.equal('Thanks you');

    wrapper.instance().refs.email.className.should.containEql('emphasis');
  });

  describe('Submit', function () {
    let clock;
    let assertInCallbackTest;

    beforeEach(function () {
      clock = sinon.useFakeTimers();
      sinon.stub(intercomUtils, 'updateIntercomEmail');
    });

    function submitRequestDocumentTest(assertInCallbackTest, done, fail=false) {
      const closeCallback = sinon.spy();
      const promise = new Promise((resolve, reject) => {
        if (fail) { reject(); }
        else { resolve(); }
      });
      let requestDocumentCallback = sinon.stub().returns(promise);

      const requestForm = mount(
        <RequestDocumentModalContent
          message={ 'Default message' }
          id={ 1 }
          closeModal={ closeCallback }
          onRequestDocument={ requestDocumentCallback }
        />
      );

      const instance = requestForm.instance();

      let handleSubmitStub;
      let oldHandleSubmit = instance.handleSubmit;

      handleSubmitStub = sinon.stub(instance, 'handleSubmit').callsFake(function (event) {
        event.preventDefault = sinon.spy();
        const handleSubmitCall = oldHandleSubmit.call(this, event);
        event.preventDefault.calledOnce.should.be.true();

        handleSubmitCall.then(() => {
          requestForm.update();
          assertInCallbackTest(requestForm);
          handleSubmitStub.restore();
        }).then(done);
      });

      instance.forceUpdate();
      requestForm.update();

      requestForm.state('warning').should.be.false();
      instance.refs.email.value = 'abc@xyz.com';
      const formElement = requestForm.find('form');
      formElement.simulate('submit');
      requestDocumentCallback.should.be.calledWith({ id: 1, email: 'abc@xyz.com' });
    }

    // TODO: BUG - when one case failed, then other case failed as well !
    it('- invalid email, should set "warning" state to true, show the messageBox', function (done) {
      assertInCallbackTest = function (requestForm) {
        requestForm.state('warning').should.be.true();

        const messageBoxElement = requestForm.find('.request-document-message-box');
        messageBoxElement.text().should.equal('Default message');
        intercomUtils.updateIntercomEmail.should.not.be.calledOnce();
      };
      submitRequestDocumentTest(assertInCallbackTest, done, true);
    });

    it('- valid email, should set "warning" state as false and call closeModal after 1.5s', function (done) {
      assertInCallbackTest = function (requestForm) {
        requestForm.state('warning').should.be.false();
        requestForm.prop('closeModal').should.not.be.calledOnce();
        clock.tick(1550);
        requestForm.prop('closeModal').should.be.calledOnce();
        intercomUtils.updateIntercomEmail.should.be.calledWith('abc@xyz.com');
      };
      submitRequestDocumentTest(assertInCallbackTest, done);
    });
  });
});
