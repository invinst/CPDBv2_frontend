import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import CategorySubItem from 'components/search-page/search-terms/category-column/category-sub-item';


describe('CategorySubItem component', () => {
  let instance;

  it('should be renderable', () => {
    CategorySubItem.should.be.renderable();
  });

  it('should contains title', () => {
    instance = renderIntoDocument(
      <CategorySubItem title={ '1st District' }/>
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--search-sub-item');
    instanceDOM.textContent.should.containEql('1st District');
  });
});
