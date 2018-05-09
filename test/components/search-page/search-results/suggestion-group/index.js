import React from 'react';
import { stub, spy } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import SuggestionGroup from 'components/search-page/search-results/suggestion-group';
import { unmountComponentSuppressError } from 'utils/test';
import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import ScrollIntoView from 'components/common/scroll-into-view';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';
import LoadMoreButton from 'components/search-page/search-results/suggestion-group/load-more-button';
import { MORE_BUTTON } from 'utils/constants';


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

  it('should assign correct selectItem', function () {
    const setSearchNavigationHandler = spy();
    let itemIndex = 1;
    const suggestions = OfficerSuggestion.buildList(2).map((item) => ({ ...item, itemIndex: itemIndex++ }));
    instance = renderIntoDocument(
      <SuggestionGroup
        setSearchNavigation={ setSearchNavigationHandler }
        suggestions={ suggestions }/>
    );
    const items = scryRenderedComponentsWithType(instance, SuggestionItem);
    items.should.have.length(2);
    items[0].props.selectItem();
    setSearchNavigationHandler.withArgs({ itemIndex: 1 }).calledOnce.should.be.true();
    items[1].props.selectItem();
    setSearchNavigationHandler.withArgs({ itemIndex: 2 }).calledOnce.should.be.true();
  });

  it('should render `More` if showMoreButton is true', function () {
    instance = renderIntoDocument(
      <SuggestionGroup showMoreButton={ true }/>
    );
    findDOMNode(instance).textContent.should.containEql('More');
  });

  it('should focus on showMoreButton when uniqueKeys are matched', function () {
    instance = renderIntoDocument(
      <SuggestionGroup
        header='OFFICER'
        showMoreButton={ true }
        focusedItem={ {
          uniqueKey: `${MORE_BUTTON}-OFFICER`
        } }
      />
    );
    const loadMoreButton = findRenderedComponentWithType(instance, LoadMoreButton);
    loadMoreButton.props.isFocused.should.be.true();
  });

  it('should load more on scroll to bottom', function () {
    const searchText = 'abc';
    const nextParams = {
      limit: 20,
      offset: 20
    };
    const getSuggestionWithContentType = stub().returns({ catch: stub() });

    instance = renderIntoDocument(
      <SuggestionGroup
        getSuggestionWithContentType={ getSuggestionWithContentType }
        searchText={ searchText } nextParams={ nextParams } hasMore={ true }/>
    );
    findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
    getSuggestionWithContentType.calledWith(searchText, nextParams).should.be.true();
  });

  it('should call single content type api when single content is detected', function () {
    const header = 'OFFICER';
    const searchText = 'abc';
    const catchSpy = stub();
    const getSuggestionWithContentType = stub().returns({ catch: catchSpy });

    instance = renderIntoDocument(
      <SuggestionGroup
        singleContent={ true }
        getSuggestionWithContentType={ getSuggestionWithContentType }
        header={ header }
        searchText={ searchText }/>
    );

    getSuggestionWithContentType.calledWith(searchText, { contentType: header }).should.be.true();
    catchSpy.called.should.be.true();
  });

  it('should render ScrollIntoView when IS single content', function () {
    instance = renderIntoDocument(<SuggestionGroup singleContent={ true }/>);
    findRenderedComponentWithType(instance, ScrollIntoView).should.be.ok();
  });

  it('should not render ScrollIntoView when is NOT single content', function () {
    instance = renderIntoDocument(<SuggestionGroup singleContent={ false }/>);
    scryRenderedComponentsWithType(instance, ScrollIntoView).should.have.length(0);
  });
});
