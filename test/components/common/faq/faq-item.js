import React from 'react';

import FAQFactory from 'utils/test/factories/faq';
import FAQItem from 'components/common/faq/faq-item';


describe('FAQItem component', function () {
  const faq = FAQFactory.build();

  it('should be renderable', function () {
    FAQItem.should.be.renderable({ faq: faq });
  });

  it('should trigger onClick', function () {
    FAQItem.should.triggerCallbackWhenClick('onClick', 'faq-title', { faq: faq }, faq);
  });
});
