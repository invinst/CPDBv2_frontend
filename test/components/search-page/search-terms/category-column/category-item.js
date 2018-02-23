import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import CategoryItem from 'components/search-page/search-terms/category-column/category-item';


describe('CategoryItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    CategoryItem.should.be.renderable({ show: true });
    CategoryItem.should.be.renderable({ hovering: true });
    CategoryItem.should.be.renderable({ isFocused: true });
  });
});
