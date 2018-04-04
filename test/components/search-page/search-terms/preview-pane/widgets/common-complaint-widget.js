import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import CommonComplaintWidget from 'components/search-page/search-terms/preview-pane/widgets/common-complaint-widget';


describe('CommonComplaintWidget', () => {
  let instance;

  it('should contain number of allegations', () => {
    instance = renderIntoDocument(
      <CommonComplaintWidget complaintCategories={ [
        {
          'name': 'Category Name 1',
          'allegation_count': 90
        },
        {
          name: 'Category Name 2',
          'allegation_count': 32
        },
      ] }/>
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--common-complaint-widget');
    const categories = instanceDOM.getElementsByTagName('li');
    categories[0].textContent.should.containEql('Category Name 1 90 allegations');
    categories[1].textContent.should.containEql('Category Name 2 32 allegations');
  });
});
