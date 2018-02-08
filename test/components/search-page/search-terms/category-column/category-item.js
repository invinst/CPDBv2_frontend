import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import CategoryItem from 'components/search-page/search-terms/category-column/category-item';


describe('CategoryItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    CategoryItem.should.be.renderable({ expanded: true });
    CategoryItem.should.be.renderable({ expanded: false });
    CategoryItem.should.be.renderable({ show: true });
    CategoryItem.should.be.renderable({ hovering: true });
    CategoryItem.should.be.renderable({ isFocused: true });
  });

  it('should trigger toggleExpanded when click on name', function () {
    CategoryItem.should.triggerCallbackWhenClick('toggleExpanded', 'link--transition');
  });
});
