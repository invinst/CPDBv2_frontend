import React from 'react';

import FAQItem from 'components/common/faq/faq-item';


describe('FAQItem component', function () {
  const fieldProps = { question: {} };

  it('should be renderable', function () {
    FAQItem.should.be.renderable({ fieldProps });
  });

  it('should trigger onClick', function () {
    FAQItem.should.triggerCallbackWhenClick('onClick', 'faq-title', { fieldProps, faqId: '11' }, '11');
  });
});
