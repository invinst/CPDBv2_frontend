import React from 'react';

import FAQItemContent from 'components/faq-page/faq-item-content';
import { unmountComponentSuppressError } from 'utils/test';

describe('FAQItemContent component', function () {
  let instance;
  const fieldProps = {
    answer: {}
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    FAQItemContent.should.be.renderable({ fieldProps });
  });
});
