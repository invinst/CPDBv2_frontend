import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import ComplaintCategory from 'components/cr-page/complaint-category';
import Popup from 'components/common/popup';


describe('ComplaintCategory component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render popup', function () {
    const popup = {
      title: 'Complaint Category',
      text: 'Some complaint category explanation',
    };
    instance = renderIntoDocument(<ComplaintCategory popup={ popup } />);
    const complaintCategoryPopup = findRenderedComponentWithType(instance, Popup);
    complaintCategoryPopup.props.title.should.eql('Complaint Category');
    complaintCategoryPopup.props.text.should.eql('Some complaint category explanation');
  });

  it('should render category and subcategory', function () {
    instance = renderIntoDocument(<ComplaintCategory category='some category' subcategory='some subcategory' />);
    const category = findRenderedDOMComponentWithClass(instance, 'test--cr-category-category');
    category.textContent.should.containEql('some category');
    const subCategory = findRenderedDOMComponentWithClass(instance, 'test--cr-category-subcategory');
    subCategory.textContent.should.eql('some subcategory');
  });
});
