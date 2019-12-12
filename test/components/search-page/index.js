import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from 'react-addons-test-utils';
import { spy, stub, useFakeTimers } from 'sinon';
import Mousetrap from 'mousetrap';
import MockStore from 'redux-mock-store';
import RootReducer from 'reducers/root-reducer';
import { createStore } from 'redux';
import { Promise } from 'es6-promise';

import * as navigateUtils from 'utils/navigate-to-search-item';
import SearchPage from 'components/search-page';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import * as intercomUtils from 'utils/intercom';
import { NavigationItem } from 'utils/test/factories/suggestion';
import SearchTags from 'components/search-page/search-tags';
import SearchBox from 'components/search-page/search-box';
import { MORE_BUTTON, RECENT_CONTENT_TYPE } from 'utils/constants';
import * as IntercomTracking from 'utils/intercom-tracking';
import * as LayeredKeyBinding from 'utils/layered-key-binding';


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
        },
      },
      recentSuggestions: [],
      pagination: {},
    },
    pinboardPage: {
      pinboard: null,
    },
  };
  const store = MockStore()(state);

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    this.browserHistoryPush.restore();
  });

  it('should not call get suggestion api when query is empty', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          getSuggestion={ getSuggestionSpy }
          query=''
        />
      </Provider>
    );
    clock.tick(600);

    getSuggestionSpy.should.not.be.called();

    clock.restore();
  });

  it('should call get suggestion api when query is set', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          getSuggestion={ getSuggestionSpy }
          query='a'
        />
      </Provider>
    );
    clock.tick(600);

    getSuggestionSpy.should.be.calledWith('a', { limit: 9 });

    clock.restore();
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

  it('should bind and unbind esc and enter keys when mounted but not hide', function () {
    const bindSpy = spy(LayeredKeyBinding, 'bind');
    const unbindSpy = spy(LayeredKeyBinding, 'unbind');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage hide={ true }/>
      </Provider>
    );

    const searchPage = findRenderedComponentWithType(instance, SearchPage);

    bindSpy.should.not.be.calledWith('esc', searchPage.handleGoBack);
    bindSpy.should.not.be.calledWith('enter', searchPage.handleViewItem);

    unmountComponentSuppressError(instance);

    unbindSpy.should.not.be.calledWith('esc');
    unbindSpy.should.not.be.calledWith('enter');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage hide={ false }/>
      </Provider>
    );

    const newSearchPage = findRenderedComponentWithType(instance, SearchPage);

    bindSpy.should.be.calledWith('esc', newSearchPage.handleGoBack);
    bindSpy.should.be.calledWith('enter', newSearchPage.handleViewItem);

    unmountComponentSuppressError(instance);

    unbindSpy.should.be.calledWith('esc');
    unbindSpy.should.be.calledWith('enter');

    bindSpy.restore();
    unbindSpy.restore();
  });

  it('should bind and unbind when update hide prop', function () {
    const bindSpy = spy(LayeredKeyBinding, 'bind');
    const unbindSpy = spy(LayeredKeyBinding, 'unbind');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage hide={ true }/>
      </Provider>
    );

    const searchPage = findRenderedComponentWithType(instance, SearchPage);

    bindSpy.should.not.be.calledWith('esc', searchPage.handleGoBack);
    bindSpy.should.not.be.calledWith('enter', searchPage.handleViewItem);
    unbindSpy.should.not.be.calledWith('esc');
    unbindSpy.should.not.be.calledWith('enter');

    instance = reRender(
      <Provider store={ store }>
        <SearchPage hide={ false }/>
      </Provider>,
      instance
    );

    const newSearchPage = findRenderedComponentWithType(instance, SearchPage);

    bindSpy.should.be.calledWith('esc', newSearchPage.handleGoBack);
    bindSpy.should.be.calledWith('enter', newSearchPage.handleViewItem);
    unbindSpy.should.not.be.calledWith('esc');
    unbindSpy.should.not.be.calledWith('enter');

    instance = reRender(
      <Provider store={ store }>
        <SearchPage hide={ true }/>
      </Provider>,
      instance
    );

    unbindSpy.should.be.calledWith('esc');
    unbindSpy.should.be.calledWith('enter');
    unbindSpy.resetHistory();

    instance = reRender(
      <Provider store={ store }>
        <SearchPage hide={ false }/>
      </Provider>,
      instance
    );

    unmountComponentSuppressError(instance);
    unbindSpy.should.be.calledWith('esc');
    unbindSpy.should.be.calledWith('enter');

    unbindSpy.restore();
    bindSpy.restore();
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

  it('should change the search box with correct text if there is queryPrefix', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage query='jerome' queryPrefix='officer'/>
      </Provider>
    );
    const searchBox = findRenderedComponentWithType(instance, SearchBox);
    searchBox.props.value.should.eql('officer:jerome');
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

  it('should not call getSuggestion while query does not change', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isRequesting={ false }
          query='abc'
          getSuggestion={ getSuggestionSpy } />
      </Provider>
    );

    clock.tick(600);
    getSuggestionSpy.should.be.calledOnce();
    getSuggestionSpy.resetHistory();

    reRender(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ [] }
          isRequesting={ true }
          query='abc'
          getSuggestion={ getSuggestionSpy } />
      </Provider>,
      instance
    );

    clock.tick(600);

    getSuggestionSpy.should.not.be.called();

    clock.restore();
  });

  it('should throttle getSuggestion calls and only keep the call with the latest query', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isRequesting={ false }
          query='abc'
          getSuggestion={ getSuggestionSpy } />
      </Provider>
    );

    reRender(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ [] }
          isRequesting={ true }
          query='abcd'
          getSuggestion={ getSuggestionSpy } />
      </Provider>,
      instance
    );

    reRender(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ [] }
          isRequesting={ true }
          query='abcde'
          getSuggestion={ getSuggestionSpy } />
      </Provider>,
      instance
    );

    clock.tick(600);

    getSuggestionSpy.should.be.calledOnce();
    getSuggestionSpy.should.be.calledWith('abcde', { limit: 9 });

    clock.restore();
  });

  it('should not call api when query changed to emtpy', function () {
    const clock = useFakeTimers();
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

    clock.tick(600);
    getSuggestionSpy.should.be.calledOnce();
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

    clock.tick(600);

    selectTagSpy.should.not.be.called();
    getSuggestionSpy.should.not.be.called();
    getSuggestionWithContentTypeSpy.should.not.be.called();

    clock.restore();
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

  it('should handle when click on pinboard button if pinboard is not exist', function (done) {
    const store = createStore(RootReducer, state);
    const createNewEmptyPinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        url: '/pinboard/5cd06f2b/',
      },
    });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <SearchPage
          createNewEmptyPinboard={ createNewEmptyPinboardStub }
        />
      </Provider>
    );

    const searchPage = findRenderedComponentWithType(instance, SearchPage);
    searchPage.handleEmptyPinboardButtonClick();

    createNewEmptyPinboardStub.should.be.called();

    setTimeout(() => {
      this.browserHistoryPush.called.should.be.true();
      done();
    }, 50);
  });
});
