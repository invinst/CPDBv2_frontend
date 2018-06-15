import React from 'react';
import { stub } from 'sinon';
import {
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  renderIntoDocument,
  Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import HoverableCategoryItem, { CategoryItem } from 'components/search-page/search-terms/category-column/category-item';


describe('CategoryItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    HoverableCategoryItem.should.be.renderable({ hovering: true });
    HoverableCategoryItem.should.be.renderable({ isFocused: true });
  });

  it('should call handleItemClick with itemUniqueKey', function () {
    const handleItemClickStub = stub();
    const itemUniqueKey = 'itemUniqueKey';

    instance = renderIntoDocument(
      <HoverableCategoryItem handleItemClick={ handleItemClickStub } itemUniqueKey={ itemUniqueKey }/>
    );
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--category-item'));

    handleItemClickStub.calledWith(itemUniqueKey).should.be.true();
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if props are changed', function () {
      instance = renderIntoDocument(
        <HoverableCategoryItem
          isFocused={ false }
          itemUniqueKey='police-beat'
          item={ {
            name: 'Police beat'
          } }/>
      );
      const catitem = findRenderedComponentWithType(instance, CategoryItem);
      catitem.shouldComponentUpdate({ isFocused: true }).should.be.true();
      catitem.shouldComponentUpdate({ itemUniqueKey: 'Ward' }).should.be.true();
      catitem.shouldComponentUpdate({ item: { name: 'Ward' } }).should.be.true();
    });

    it('should return false if props are unchanged', function () {
      instance = renderIntoDocument(
        <HoverableCategoryItem
          isFocused={ false }
          itemUniqueKey='police-beat'
          item={ {
            name: 'Police beat'
          } }/>
      );
      const catitem = findRenderedComponentWithType(instance, CategoryItem);
      catitem.shouldComponentUpdate({
        hovering: false,
        isFocused: false,
        itemUniqueKey: 'police-beat',
        item: {
          name: 'Police beat'
        }
      }).should.be.false();
    });
  });
});
