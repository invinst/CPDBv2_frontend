import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import ComplaintCategory from 'components/cr-page/complaint-category';


describe('ComplaintCategory component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render category and subcategory', function () {
    instance = renderIntoDocument(<ComplaintCategory category='some category' subcategory='some subcategory' />);
    const category = findRenderedDOMComponentWithClass(instance, 'test--cr-category-category');
    category.textContent.should.containEql('some category');
    const subCategory = findRenderedDOMComponentWithClass(instance, 'test--cr-category-subcategory');
    subCategory.textContent.should.eql('some subcategory');
  });
});
