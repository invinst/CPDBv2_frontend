import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import CategoryColumn from 'components/search-page/search-terms/category-column';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { SearchTermCategory } from 'utils/test/factories/search-terms';


describe('CategoryColumn component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CategoryColumn.should.be.renderable();
  });

  it('should be able to focus to header', function () {
    const items = SearchTermCategory.buildList(1);
    const name = items[0].name;
    const focusedItem = { uniqueKey: `category-${name}` };
    instance = renderIntoDocument(
      <CategoryColumn
        key={ name }
        name={ name }
        items={ items }
        focusedItem={ focusedItem } />
    );

    const header = findRenderedDOMComponentWithClass(instance, 'test--category-header');

    header.textContent.should.eql(name);
    header.className.should.containEql('focused');
  });
});
