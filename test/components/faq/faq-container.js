import 'should';
import React from 'react';

import 'utils/test/React';
import FAQContainer from 'components/faq/faq-container';


describe('FAQContainer component', function () {
  it('should render in all screen size', function () {
    FAQContainer.should.be.renderable();
    FAQContainer.should.be.responsiveRenderable();
  });
});
