import React from 'react';
import { Provider } from 'react-redux';
import { Router, createMemoryHistory, Route } from 'react-router';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  findRenderedDOMComponentWithTag,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';
import { browserHistory } from 'react-router';
import Mousetrap from 'mousetrap';
import lodash from 'lodash';
import MockStore from 'redux-mock-store';
import RootReducer from 'reducers/root-reducer';
import { createStore } from 'redux';

import * as navigateUtils from 'utils/navigate-to-search-item';
import SearchPageContainer from 'containers/search-page';
import SearchPage from 'components/search-page';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import * as intercomUtils from 'utils/intercom';
import { NavigationItem } from 'utils/test/factories/suggestion';
import SearchTags from 'components/search-page/search-tags';
import SearchBox from 'components/search-page/search-box';
import { MORE_BUTTON, RECENT_CONTENT_TYPE } from 'utils/constants';
import * as IntercomTracking from 'utils/intercom-tracking';
import { showToast } from 'actions/toast';


describe('SearchPage component', function () {
  let instance;
  const state = {
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
      pagination: {},
    },
    pinboard: null,
    toast: {}
  };
  const store = MockStore()(state);

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

  it('should call get suggestion api when change search input', function () {
    const getSuggestion = stub().returns({ catch: spy() });
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage getSuggestion={ getSuggestion } />
      </Provider>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = 'a';

    Simulate.change(searchInput);

    getSuggestion.should.be.calledWith('a', { limit: 9 });
  });

  it('should not call get suggestion api when query is empty', function () {
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const getSuggestionWithContentTypeSpy = stub().returns({ catch: spy() });
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          getSuggestion={ getSuggestionSpy }
          getSuggestionWithContentType={ getSuggestionWithContentTypeSpy }
          query=''
        />
      </Provider>
    );
    getSuggestionSpy.should.not.be.called();
    getSuggestionWithContentTypeSpy.should.not.be.called();
  });

  it('should call get suggestion api when query is set', function () {
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const getSuggestionWithContentTypeSpy = stub().returns({ catch: spy() });
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          getSuggestion={ getSuggestionSpy }
          getSuggestionWithContentType={ getSuggestionWithContentTypeSpy }
          query='a'
        />
      </Provider>
    );
    getSuggestionSpy.should.be.calledWith('a', { limit: 9 });
    getSuggestionWithContentTypeSpy.should.not.be.called();
  });

  it('should call get suggestion api with contentType when query and contentType not empty', function () {
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const getSuggestionWithContentTypeSpy = stub().returns({ catch: spy() });
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          getSuggestion={ getSuggestionSpy }
          getSuggestionWithContentType={ getSuggestionWithContentTypeSpy }
          query='a'
          contentType='OFFICER'
        />
      </Provider>
    );
    getSuggestionSpy.should.not.be.called();
    getSuggestionWithContentTypeSpy.should.be.calledWith('a', { contentType: 'OFFICER' });
  });

  it('should clear all tags when user remove all text', function () {
    const selectTag = spy();
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage selectTag={ selectTag } />
      </Provider>
    );
    const searchInput = findRenderedDOMComponentWithTag(instance, 'input');
    searchInput.value = '';
    Simulate.change(searchInput);
    selectTag.calledWith(null).should.be.true();
  });

  it('should call browserHistory.push when user click on searchbar__button--back', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage />
      </Provider>
    );

    const backButton = findRenderedDOMComponentWithClass(instance, 'searchbar__button--back');
    Simulate.click(backButton);
    this.browserHistoryPush.calledWith('/').should.be.true();
  });

  it('should call router.goBack when user hit ESCAPE', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage />
      </Provider>
    );

    Mousetrap.trigger('esc');
    this.browserHistoryPush.calledWith('/').should.be.true();
  });

  it('should not change the current search path when user type in search box', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage searchTermsHidden={ false }/>
      </Provider>
    );
    const searchBox = findRenderedComponentWithType(instance, SearchBox);
    searchBox.props.onChange({ currentTarget: { value: 'jer' } });
    this.browserHistoryPush.called.should.be.false();
  });

  describe('handleViewItem', function () {
    it('should use browserHistory.push() if visiting focused item with internal link', function () {
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchPage focusedItem={ NavigationItem.build({ to: '/dummy/url' }) } />
        </Provider>
      );
      Mousetrap.trigger('enter');
      this.browserHistoryPush.calledWith('/dummy/url').should.be.true();
    });

    it('should call handleSelect to show more suggestion items when entering on More button', function () {
      const handleSelectStub = stub(SearchPage.prototype, 'handleSelect');
      instance = renderIntoDocument(
        <Provider store={ store }>
          <SearchPage
            focusedItem={ NavigationItem.build({ id: 'OFFICER', 'type': MORE_BUTTON }) }
            />
        </Provider>
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
    const selectTagSpy = spy();
    const tags = ['a', 'b'];

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          selectTag={ selectTagSpy }
          tags={ tags }
          query={ 'a' }
        />
      </Provider>
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElements = scryRenderedDOMComponentsWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElements[0]);

    selectTagSpy.calledWith('a').should.be.true();
  });

  it('should not call api when select recent content', function () {
    const getSuggestionWithContentType = spy();
    const getSuggestion = stub().returns({ catch: spy() });
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

    getSuggestion.reset();

    Simulate.click(tagElements[0]);
    getSuggestionWithContentType.called.should.be.false();
    getSuggestion.called.should.be.false();
  });

  it('should call selectTag(null) when user deselect a tag', function () {
    const tags = ['a', 'b'];
    const selectTagSpy = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage tags={ tags } selectTag={ selectTagSpy } contentType='a' query='c' />
      </Provider>
    );

    const suggestionTagsElement = findRenderedComponentWithType(instance, SearchTags);
    const tagElements = scryRenderedDOMComponentsWithTag(suggestionTagsElement, 'span');
    Simulate.click(tagElements[0]);
    selectTagSpy.calledWith(null).should.be.true();
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

  it('should deselect tag and call getSuggestion when the selected tag has no data', function () {
    const selectTagSpy = spy();
    const getSuggestionSpy = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
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
          isEmpty={ true }
          query='abc'
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy } />
      </Provider>,
      instance
    );

    selectTagSpy.calledWith(null).should.be.true();
    getSuggestionSpy.calledWith('abc', { limit: 9 }).should.be.true();
  });

  it('should not deselect tag and call getSuggestion while requesting', function () {
    const selectTagSpy = spy();
    const getSuggestionSpy = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
          isRequesting={ false }
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
          isEmpty={ true }
          isRequesting={ true }
          query='abc'
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy } />
      </Provider>,
      instance
    );

    selectTagSpy.should.not.be.called();
    getSuggestionSpy.should.not.be.called();
  });

  it('should not deselect tag when suggestions is not empty', function () {
    const selectTagSpy = spy();
    const getSuggestionSpy = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
          isRequesting={ false }
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy } />
      </Provider>
    );
    selectTagSpy.resetHistory();
    getSuggestionSpy.resetHistory();

    reRender(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
          isRequesting={ false }
          query='abc'
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy } />
      </Provider>,
      instance
    );

    selectTagSpy.should.not.be.called();
    getSuggestionSpy.calledWith('abc', { limit: 9 }).should.be.true();
  });

  it('should call getSuggestionWithType when query changed and contentType is set', function () {
    const selectTagSpy = spy();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const getSuggestionWithContentTypeSpy = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
          isRequesting={ false }
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy }
          getSuggestionWithContentType={ getSuggestionWithContentTypeSpy } />
      </Provider>
    );
    selectTagSpy.resetHistory();
    getSuggestionSpy.resetHistory();

    reRender(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
          isRequesting={ false }
          contentType='OFFICER'
          query='abc'
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy }
          getSuggestionWithContentType={ getSuggestionWithContentTypeSpy } />
      </Provider>,
      instance
    );

    selectTagSpy.should.not.be.called();
    getSuggestionSpy.should.not.be.called();
    getSuggestionWithContentTypeSpy.calledWith('abc', { contentType: 'OFFICER' }).should.be.true();
  });

  it('should not call api when query changed to emtpy', function () {
    const selectTagSpy = spy();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const getSuggestionWithContentTypeSpy = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
          isRequesting={ false }
          query='abc'
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy }
          getSuggestionWithContentType={ getSuggestionWithContentTypeSpy } />
      </Provider>
    );
    selectTagSpy.resetHistory();
    getSuggestionSpy.resetHistory();

    reRender(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isEmpty={ false }
          isRequesting={ false }
          contentType='OFFICER'
          query=''
          selectTag={ selectTagSpy }
          getSuggestion={ getSuggestionSpy }
          getSuggestionWithContentType={ getSuggestionWithContentTypeSpy } />
      </Provider>,
      instance
    );

    selectTagSpy.should.not.be.called();
    getSuggestionSpy.should.not.be.called();
    getSuggestionWithContentTypeSpy.should.not.be.called();
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
          <Provider store={ store }>
            <SearchPage/>
          </Provider>
        );
        intercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
      });

      it('should show intercom launcher again when unmounted', function () {
        instance = renderIntoDocument(
          <Provider store={ store }>
            <SearchPage/>
          </Provider>
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
          <Provider store={ store }>
            <SearchPage/>
          </Provider>
        );
        IntercomTracking.trackSearchPage.called.should.be.true();
      });
    });
  });

  it('should show toast on toast prop change', function () {
    const showToastStub = spy(SearchPage.prototype, 'showToast');

    const store = createStore(RootReducer, state);

    const searchPage = () => (
      <Provider store={ store }>
        <SearchPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ searchPage } />
      </Router>
    );

    store.dispatch(showToast({
      isPinned: true,
      type: 'CR',
    }));

    showToastStub.should.be.called();
  });
});
