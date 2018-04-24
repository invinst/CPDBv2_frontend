import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import ComplaintCard from 'components/cr-page/related-complaints/complaint-card';


describe('ComplaintCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    ComplaintCard.should.be.renderable();
  });
});
