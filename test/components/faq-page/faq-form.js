import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate } from 'react-addons-test-utils';

import FAQForm from 'components/faq-page/faq-form';
import { unmountComponentSuppressError } from 'utils/test';


describe('FAQForm component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQForm.should.be.renderable({ handleSubmit: () => {} });
  });

  it('should disable ask button on reset', function () {
    instance = renderIntoDocument(
      <FAQForm handleSubmit={ () => {} }/>
    );

    const [titleInput, askBtn] = scryRenderedDOMComponentsWithTag(instance, 'input');

    askBtn.disabled.should.be.true();
    titleInput.value = 'title';
    Simulate.change(titleInput);
    askBtn.disabled.should.be.false();
    instance.handleReset();
    askBtn.disabled.should.be.true();
  });
});
