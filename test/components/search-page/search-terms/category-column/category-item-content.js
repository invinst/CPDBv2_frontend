import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import CategoryItemContent from 'components/search-page/search-terms/category-column/category-item-content';


describe('CategoryItemContent component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CategoryItemContent.should.be.renderable();
  });
});
