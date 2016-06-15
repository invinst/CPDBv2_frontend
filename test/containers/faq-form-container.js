import sinon from 'sinon';
import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import FAQForm from 'components/faq-page/faq-form';
import { UnconnectedFAQFormContainer } from 'containers/faq-form-container';


describe('FAQFormContainer', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render FAQForm', function () {
    instance = renderIntoDocument(
      <UnconnectedFAQFormContainer askQuestion={ () => {} } isSubmitting={ false }/>
    );
    findRenderedComponentWithType(instance, FAQForm);
  });

  it('should call askQuestion on handleSubmit', function () {
    const title = 'title';
    const askQuestionCallback = sinon.stub().returns({
      then: (callback) => { callback(); }
    });
    const resetSpy = sinon.spy();
    const event = {
      preventDefault: () => {},
      target: {
        title: {
          value: title
        },
        reset: resetSpy
      }
    };

    instance = renderIntoDocument(
      <UnconnectedFAQFormContainer askQuestion={ askQuestionCallback } isSubmitting={ false }/>
    );
    instance.handleSubmit(event);
    askQuestionCallback.calledWith({ title: title });
    resetSpy.called.should.be.true();
  });
});
