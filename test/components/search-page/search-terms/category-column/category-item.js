import React from 'react';
import { stub } from 'sinon';
import { findRenderedDOMComponentWithClass, renderIntoDocument, Simulate } from 'react-addons-test-utils';

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

  it('should call handleItemClick with itemUniqueKey', function () {
    const handleItemClickStub = stub();
    const itemUniqueKey = 'itemUniqueKey';

    instance = renderIntoDocument(
      <CategoryItem handleItemClick={ handleItemClickStub } itemUniqueKey={ itemUniqueKey } />
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--category-item'));

    handleItemClickStub.calledWith(itemUniqueKey).should.be.true();
  });
});
