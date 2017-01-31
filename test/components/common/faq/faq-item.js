import React from 'react';
import { renderIntoDocument, Simulate, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import FAQItem from 'components/common/faq/faq-item';
import { unmountComponentSuppressError } from 'utils/test';


describe('FAQItem component', function () {
  const fieldProps = { question: {} };

  it('should be renderable', function () {
    FAQItem.should.be.renderable({ fieldProps });
  });

  it('should trigger onClick', function () {
    FAQItem.should.triggerCallbackWhenClick('onClick', 'faq-title', { fieldProps, faqId: '11' }, '11');
  });

  describe('handle hover event', function () {
    let instance;

    beforeEach(function () {
      const fieldProps = { question: 'question' };

      instance = renderIntoDocument(
        <FAQItem fieldProps={ fieldProps } faqId='1' />
      );
    });

    afterEach(function () {
      unmountComponentSuppressError(instance);
    });

    it('should handle on mouse enter', function () {
      instance.setState({ _radiumStyleState: { attrs: { ':hover': false } } });

      const faqItem = findRenderedDOMComponentWithClass(instance, 'faq-title');
      Simulate.mouseEnter(faqItem);

      instance.state['_radiumStyleState']['attrs'][':hover'].should.be.true();
    });

    it('should handle on mouse leave', function () {
      instance.setState({ _radiumStyleState: { attrs: { ':hover': true } } });

      const faqItem = findRenderedDOMComponentWithClass(instance, 'faq-title');
      Simulate.mouseLeave(faqItem);

      instance.state['_radiumStyleState']['attrs'][':hover'].should.be.false();
    });
  });
});
