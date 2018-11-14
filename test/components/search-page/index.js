import React from 'react';
import { Provider } from 'react-redux';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import { spy, stub, useFakeTimers } from 'sinon';
import { browserHistory } from 'react-router';
import Mousetrap from 'mousetrap';
import lodash from 'lodash';
import MockStore from 'redux-mock-store';

import * as navigateUtils from 'utils/navigate-to-search-item';
import SearchPage from 'components/search-page';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import * as intercomUtils from 'utils/intercom';
import { NavigationItem } from 'utils/test/factories/suggestion';
import SearchTags from 'components/search-page/search-tags';
import SearchBox from 'components/search-page/search-box';
import { MORE_BUTTON, RECENT_CONTENT_TYPE } from 'utils/constants';
import * as IntercomTracking from 'utils/intercom-tracking';


describe('SearchPage component', function () {
  let instance;
  const store = MockStore()({
    searchPage: {
      tags: [],
      navigation: {},
      searchTerms: {
        categories: [],
        hidden: true,
        navigation: {
          itemIndex: 0,
        }
      },
      pagination: {}
    }
  });

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
    // Stub lodash.debounce() so that it returns the input function as-is
    this.debounceStub = stub(lodash, 'debounce').callsFake(func => func);
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    this.browserHistoryPush.restore();
    this.debounceStub.restore();
  });

  it('should call get suggestion api when no contentType selected', function () {
    const getSuggestion = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <SearchPage getSuggestion={ getSuggestion } />
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    getSuggestion.calledWith('a', {
      contentType: null,
      limit: 9
    }).should.be.true();
  });

  it('should call get suggestion api when contentType is selected', function () {
    const getSuggestionWithContentType = stub().returns({ catch: spy() });
    const contentType = 'OFFICER';

    instance = renderIntoDocument(
      <SearchPage
        contentType={ contentType }
        getSuggestionWithContentType={ getSuggestionWithContentType }

      />
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';
    Simulate.change(searchInput);
    getSuggestionWithContentType.calledWith('a', {
      contentType
    }).should.be.true();
  });

  it('should clear all tags when user remove all text', function () {
    const selectTag = spy();
    instance = renderIntoDocument(
      <SearchPage selectTag={ selectTag } />
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = '';
    Simulate.change(searchInput);
    selectTag.calledWith(null).should.be.true();
  });

  it('should call browserHistory.push when user click on searchbar__button--back', function () {
    instance = renderIntoDocument(
      <SearchPage />
    );

    const backButton = findRenderedDOMComponentWithClass(instance, 'searchbar__button--back');
    Simulate.click(backButton);
    this.browserHistoryPush.calledWith('/').should.be.true();
  });

  it('should call router.goBack when user hit ESCAPE', function () {
    instance = renderIntoDocument(
      <SearchPage />
    );

    Mousetrap.trigger('esc');
    this.browserHistoryPush.calledWith('/').should.be.true();
  });

  it('should change to search path when user type in search box', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage searchTermsHidden={ false }/>
      </Provider>
    );
    const searchBox = findRenderedComponentWithType(instance, SearchBox);
    searchBox.props.onChange({ currentTarget: { value: 'jer' } });
    this.browserHistoryPush.calledWith('/search/').should.be.true();
  });

  describe('handleViewItem', function () {
    it('should use browserHistory.push() if visiting focused item with internal link', function () {
      instance = renderIntoDocument(
        <SearchPage focusedItem={ NavigationItem.build({ to: '/dummy/url' }) }

        />
      );
      Mousetrap.trigger('enter');
      this.browserHistoryPush.calledWith('/dummy/url').should.be.true();
    });

    it('should call handleSelect to show more suggestion items when entering on More button', function () {
      const handleSelectStub = stub(SearchPage.prototype, 'handleSelect');
      instance = renderIntoDocument(
        <SearchPage
          focusedItem={ NavigationItem.build({ id: 'OFFICER', 'type': MORE_BUTTON }) }
          />
      );
      Mousetrap.trigger('enter');
      handleSelectStub.calledWith('OFFICER');

      handleSelectStub.restore();
    });

    it('should call handleSearchBoxEnter when user hits ENTER, there is no result and SearchBox is unfocused',
      function () {
        const navigateToSearchItem = stub(navigateUtils, 'navigateToSearchItem');
        instance = renderIntoDocument(
          <Provider store={ store }>
            <SearchPage query='no-result'/>
          </Provider>
        );
        Mousetrap.trigger('down');
        Mousetrap.trigger('down');
        Mousetrap.trigger('enter');

        navigateToSearchItem.calledOnce.should.be.true();
        navigateToSearchItem.restore();
      }
    );
  });

  it('should push search into breadcrumbs', function () {
    const location = {
      pathname: '/search', search: '/', action: 'POP'
    };
    const params = {};
    const routes = [];
    const stubPushBreadcrumbs = stub();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          location={ location } params={ params } routes={ routes } pushBreadcrumbs={ stubPushBreadcrumbs }
        />
      </Provider>
    );
    stubPushBreadcrumbs.calledWith({ location, params, routes }).should.be.true();
  });

  it('should call api with content type when user select a tag', function () {
    const getSuggestionWithContentType = spy();
    const tags = ['a', 'b'];

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          getSuggestionWithContentType={ getSuggestionWithContentType }
          tags={ tags } query={ 'a' }
        />
      </Provider>
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElements = scryRenderedDOMComponentsWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElements[0]);

    getSuggestionWithContentType.calledWith('a', {
      contentType: 'a'
    }).should.be.true();
  });

  it('should not call api when select recent content', function () {
    const getSuggestionWithContentType = spy();
    const getSuggestion = spy();
    const tags = [RECENT_CONTENT_TYPE, 'b'];
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          getSuggestionWithContentType={ getSuggestionWithContentType }
          getSuggestion={ getSuggestion }
          tags={ tags }
          query='a'
        />
      </Provider>
    );
    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElements = scryRenderedDOMComponentsWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElements[0]);
    getSuggestionWithContentType.called.should.be.false();
    getSuggestion.called.should.be.false();
  });

  it('should call api when user deselect a tag', function () {
    const getSuggestion = spy();
    const tags = ['a', 'b'];

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage getSuggestion={ getSuggestion } tags={ tags } contentType='a' query='c' />
      </Provider>
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElements = scryRenderedDOMComponentsWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElements[0]);
    getSuggestion.calledWith('c').should.be.true();
  });

  it('should call resetSearchResultNavigation if SearchPage resetNavigation is called when Search Term is hidden',
    function () {
      const resetSearchResultNavigation = stub();
      const resetSearchTermNavigation = stub();

      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchPage
            resetSearchResultNavigation={ resetSearchResultNavigation }
            resetSearchTermNavigation={ resetSearchTermNavigation }
          />
        </Provider>
      );

      const searchBox = findRenderedComponentWithType(instance, SearchPage);
      searchBox.resetNavigation(1);
      resetSearchResultNavigation.calledWith(1).should.be.true();
    });

  describe('test re-render', function () {
    let clock;
    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should called changeSearchQuery when pathname and query changed', function () {
      const changeSearchQuery = spy();
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchPage location={ { pathname: 'a' } } changeSearchQuery={ changeSearchQuery }/>
        </Provider>
      );

      reRender(
        <Provider store={ store }>
          <SearchPage
            query='xxx'
            location={ { pathname: 'b' } }
            changeSearchQuery={ changeSearchQuery }
          />
        </Provider>,
        instance
      );
      clock.tick(600);
      changeSearchQuery.calledWith('xxx').should.be.true();
    });
  });

  it('should deselect tag and call getSuggestion when the selected tag has no data', function () {
    const selectTagSpy = spy();
    const getSuggestionSpy = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy } />
      </Provider>
    );
    selectTagSpy.resetHistory();
    getSuggestionSpy.resetHistory();

    reRender(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ [] }
          query='abc'
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy } />
      </Provider>,
      instance
    );

    selectTagSpy.calledWith(null).should.be.true();
    getSuggestionSpy.calledWith('abc', { limit: 9 }).should.be.true();
  });

  describe('Intercom', function () {
    describe('Intercom launcher', function () {
      beforeEach(function () {
        stub(intercomUtils, 'showIntercomLauncher');
      });

      afterEach(function () {
        intercomUtils.showIntercomLauncher.restore();
      });

      it('should hide intercom launcher when mounted', function () {
        instance = renderIntoDocument(
          <SearchPage/>
        );
        intercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
      });

      it('should show intercom launcher again when unmounted', function () {
        instance = renderIntoDocument(
          <SearchPage/>
        );
        intercomUtils.showIntercomLauncher.resetHistory();
        unmountComponentSuppressError(instance);
        intercomUtils.showIntercomLauncher.calledWith(true).should.be.true();
      });
    });

    describe('Intercom tracking', function () {
      beforeEach(function () {
        stub(IntercomTracking, 'trackSearchPage');
      });

      afterEach(function () {
        IntercomTracking.trackSearchPage.restore();
      });

      it('should track Intercom with search page', function () {
        instance = renderIntoDocument(
          <SearchPage/>
        );
        IntercomTracking.trackSearchPage.called.should.be.true();
      });
    });
  });
});
