import React from 'react';

import FAQFull from 'components/landing-page/faq-section/faq-full';
import { unmountComponentSuppressError } from 'utils/test';


describe('FAQFull component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    FAQFull.should.be.renderable();
  });
});
