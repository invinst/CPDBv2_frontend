import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import ListWidget from 'components/search-page/preview-pane/widgets/list-widget';


describe('ListWidget', () => {
  let instance;

  it('should contain number of allegations', () => {
    const complaintCategories = [
      {
        'id': 1,
        'name': 'Category Name 1',
        'count': 90
      },
      {
        'id': 2,
        'name': 'Category Name 2',
        'count': 32
      },
    ];
    instance = renderIntoDocument(
      <ListWidget
        typeName={ 'allegation' }
        items={ complaintCategories }
        title={ 'TITLE' }
      />
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--list-widget');
    const categories = instanceDOM.getElementsByTagName('li');
    categories[0].textContent.should.containEql('Category Name 1');
    categories[0].textContent.should.containEql('90 allegations');
    categories[1].textContent.should.containEql('Category Name 2');
    categories[1].textContent.should.containEql('32 allegations');
  });
});
