import React from 'react';

import FAQSection from 'components/landing-page/faq/faq-section';


describe('FAQSection component', function () {
  it('should render in all screen size', function () {
    FAQSection.should.be.renderable();
    FAQSection.should.be.responsiveRenderable();
  });
});
