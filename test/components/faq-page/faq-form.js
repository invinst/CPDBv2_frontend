import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';
import { stub, spy } from 'sinon';

import 'polyfill';
import FAQForm from 'components/faq-page/faq-form';
import { unmountComponentSuppressError } from 'utils/test';


describe('FAQForm component', function () {
  let instance;
  const askQuestion = () => {};

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQForm.should.be.renderable({ askQuestion });
  });

  it('should disable ask button on reset', function () {
    instance = renderIntoDocument(
      <FAQForm askQuestion={ askQuestion }/>
    );

    const [titleInput, askBtn] = scryRenderedDOMComponentsWithTag(instance, 'input');

    askBtn.disabled.should.be.true();
    titleInput.value = 'title';
    Simulate.change(titleInput);
    askBtn.disabled.should.be.false();
    instance.handleReset();
    askBtn.disabled.should.be.true();
  });

  it('should call askQuestion on handleSubmit', function () {
    const title = 'title';
    const askQuestionCallback = stub().returns({
      then: (callback) => { callback(); }
    });
    const resetSpy = spy();
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
      <FAQForm askQuestion={ askQuestionCallback } isSubmitting={ false }/>
    );
    instance.handleSubmit(event);
    askQuestionCallback.calledWith({ title: title });
    resetSpy.called.should.be.true();
  });
});
