import React from 'react';
import { spy } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';

import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import { unmountComponentSuppressError } from 'utils/test';
import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';


describe('SuggestionGroup component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SuggestionItem', function () {
    instance = renderIntoDocument(
      <SuggestionGroup suggestions={ OfficerSuggestion.buildList(3) }/>
    );
    scryRenderedComponentsWithType(instance, SuggestionItem).should.have.length(3);
  });

  it('should render `More` if showMoreButton is true', function () {
    instance = renderIntoDocument(
      <SuggestionGroup showMoreButton={ true }/>
    );
    findDOMNode(instance).textContent.should.containEql('More');
  });

  it('should load more on scroll to bottom', function () {
    const searchText = 'abc';
    const nextParams = {
      limit: 20,
      offset: 20
    };
    const getSuggestionWithContentType = spy();

    instance = renderIntoDocument(
      <SuggestionGroup
        getSuggestionWithContentType={ getSuggestionWithContentType }
        searchText={ searchText } nextParams={ nextParams } hasMore={ true }/>
    );
    findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
    getSuggestionWithContentType.calledWith(searchText, nextParams).should.be.true();
  });
});
