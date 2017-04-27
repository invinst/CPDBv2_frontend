import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import YearItem from 'components/officer-page/timeline-page/year-item';


describe('YearItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    YearItem.should.be.renderable({ item: { year: '2000', crs: '1' } });
  });
});
