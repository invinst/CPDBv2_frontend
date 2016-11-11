import React from 'react';

import { SimpleFAQFactory } from 'utils/test/factories/faq';
import FAQItem from 'components/common/faq/faq-item';


describe('FAQItem component', function () {
  const faq = SimpleFAQFactory.build();

  it('should be renderable', function () {
    FAQItem.should.be.renderable({ faq: faq });
  });

  it('should trigger onClick', function () {
    FAQItem.should.triggerCallbackWhenClick('onClick', 'faq-title', { faq: faq }, faq.id);
  });
});
