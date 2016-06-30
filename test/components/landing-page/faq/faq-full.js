import React from 'react';

import FAQFull from 'components/landing-page/faq/faq-full';
import { unmountComponentSuppressError } from 'utils/test';


describe('FAQFull component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should be renderable', function () {
    FAQFull.should.be.renderable();
  });

  it('should trigger closeBottomSheet when click on More FAQ', function () {
    FAQFull.should.triggerCallbackWhenClick('closeBottomSheet', 'footer__link');
  });
});
