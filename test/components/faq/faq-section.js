import React from 'react';

import FAQSection from 'components/faq/faq-section';


describe('FAQSection component', function () {
  it('should render in all screen size', function () {
    FAQSection.should.be.renderable();
    FAQSection.should.be.responsiveRenderable();
  });
});
