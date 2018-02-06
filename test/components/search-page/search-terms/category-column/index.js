import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import CategoryColumn from 'components/search-page/search-terms/category-column';


describe('CategoryColumn component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CategoryColumn.should.be.renderable();
  });
});
