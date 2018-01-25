import React from 'react';
import { spy } from 'sinon';
import should from 'should';
import {
  renderIntoDocument, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SearchTerms from 'components/search-page/search-terms';
import { SearchTermCategory } from 'utils/test/factories/search-terms';
import CategoryColumn from 'components/search-page/search-terms/category-column';


describe('SearchTerms component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    SearchTerms.should.be.renderable();
  });

  it('should set expandedId when trigger toggleExpanded', function () {
    instance = renderIntoDocument(
      <SearchTerms categories={ SearchTermCategory.buildList(1) }/>
    );
    const columns = scryRenderedComponentsWithType(instance, CategoryColumn);
    columns[0].props.toggleExpanded('abc');
    instance.state.expandedId.should.eql('abc');
  });

  it('should set expandedId to null when triggered with a similar id', function () {
    instance = renderIntoDocument(
      <SearchTerms categories={ SearchTermCategory.buildList(1) }/>
    );
    instance.setState({ expandedId: 'abc' });
    const columns = scryRenderedComponentsWithType(instance, CategoryColumn);
    columns[0].props.toggleExpanded('abc');
    should(instance.state.expandedId).be.null();
  });

  it('should fire request when mounted', function () {
    const callback = spy();
    instance = renderIntoDocument(
      <SearchTerms requestSearchTermCategories={ callback }/>
    );
    callback.called.should.be.true();
  });
});
