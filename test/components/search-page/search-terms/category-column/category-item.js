import React from 'react';
import { stub } from 'sinon';
import {
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CategoryItem from 'components/search-page/search-terms/category-column/category-item';
import CategorySubItem from 'components/search-page/search-terms/category-column/category-sub-item';


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

  it('should call handleItemClick with itemUniqueKey', function () {
    const handleItemClickStub = stub();
    const itemUniqueKey = 'itemUniqueKey';

    instance = renderIntoDocument(
      <CategoryItem handleItemClick={ handleItemClickStub } itemUniqueKey={ itemUniqueKey }/>
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--category-item'));

    handleItemClickStub.calledWith(itemUniqueKey).should.be.true();
  });

  it('should contains sub-item when it is focused', function () {
    instance = renderIntoDocument(
      <CategoryItem isFocused={ true }>
        <CategorySubItem title={ 'item 1' }/>
        <CategorySubItem title={ 'item 2' }/>
      </CategoryItem>
    );
    scryRenderedComponentsWithType(instance, CategorySubItem).should.have.length(2);
  });

  it('should not display sub-item when it is not focused', function () {
    instance = renderIntoDocument(
      <CategoryItem>
        <CategorySubItem title={ 'item 1' }/>
        <CategorySubItem title={ 'item 2' }/>
      </CategoryItem>
    );
    scryRenderedComponentsWithType(instance, CategorySubItem).should.have.length(0);
  });
});
