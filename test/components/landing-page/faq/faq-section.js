import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import FAQSection from 'components/landing-page/faq/faq-section';


describe('FAQSection component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render in all screen size', function () {
    FAQSection.should.be.renderable();
    FAQSection.should.be.responsiveRenderable();
  });

  it('should trigger onFAQClick when click on an FAQ', function () {
    FAQSection.should.triggerCallbackWhenClick('onFAQClick', 'article-small');
  });
});
