import React from 'react';

import FAQSectionContent from 'components/landing-page/faq-section/faq-section-content';
import FAQFactory from 'utils/test/factories/faq';


describe('FAQSectionContent component', function () {
  const faqs = FAQFactory.buildList(3);

  it('should be renderable', function () {
    FAQSectionContent.should.be.renderable({ faqs: faqs });
  });

  it('should trigger onFAQClick on FAQ clicked', function () {
    FAQSectionContent.should.triggerCallbackWhenClick('onFAQClick', 'faq-title', { faqs: faqs }, faqs[0]);
  });
});
