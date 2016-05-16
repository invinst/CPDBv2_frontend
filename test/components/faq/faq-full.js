import 'should';
import React from 'react';

import FAQFull from 'components/faq/faq-full';
import 'utils/test/React';


describe('FAQFull component', function () {
  it('should be renderable', function () {
    FAQFull.should.be.renderable();
  });
});
