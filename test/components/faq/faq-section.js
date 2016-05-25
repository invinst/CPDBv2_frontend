import 'should';
import React from 'react';

import 'utils/test/React';
import FAQSection from 'components/faq/faq-section';


describe('FAQSection component', function () {
  it('should render in all screen size', function () {
    FAQSection.should.be.renderable();
    FAQSection.should.be.responsiveRenderable();
  });
});
