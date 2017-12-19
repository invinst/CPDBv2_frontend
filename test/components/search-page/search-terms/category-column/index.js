import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import { SearchTermCategoryItem } from 'utils/test/factories/search-terms';
import CategoryColumn from 'components/search-page/search-terms/category-column';


describe('CategoryColumn component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    CategoryColumn.should.be.renderable();
  });

  it('should trigger onSelected if selected when mounted', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <CategoryColumn selected={ true } onSelected={ callback }/>
    );
    callback.called.should.be.true();
  });

  it('should trigger onSelected if receive new selected prop', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <CategoryColumn selected={ false } onSelected={ callback }/>
    );
    callback.called.should.be.false();

    reRender(<CategoryColumn selected={ true }/>, instance);
    callback.called.should.be.true();
  });

  it('should render items in 13-items chunks', function () {
    const items = SearchTermCategoryItem.buildList(20);
    instance = renderIntoDocument(<CategoryColumn items={ items }/>);
    const chunks = scryRenderedDOMComponentsWithClass(instance, 'test--category-item-chunk');
    chunks.should.have.length(2);
    chunks[0].children.should.have.length(13);
    chunks[1].children.should.have.length(7);
  });
});
