import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { spy, stub, match, useFakeTimers } from 'sinon';
import Mousetrap from 'mousetrap';
import MockStore from 'redux-mock-store';
import RootReducer from 'reducers/root-reducer';
import { createStore } from 'redux';
import { Promise } from 'es6-promise';
import { MemoryRouter } from 'react-router-dom';

import browserHistory from 'utils/history';
import * as navigateUtils from 'utils/navigate-to-search-item';
import SearchPage from 'components/search-page';
import * as intercomUtils from 'utils/intercom';
import { NavigationItem } from 'utils/test/factories/suggestion';
import SearchTags from 'components/search-page/search-tags';
import SearchBox from 'components/search-page/search-box';
import { MORE_BUTTON, RECENT_CONTENT_TYPE } from 'utils/constants';
import * as IntercomTracking from 'utils/intercom-tracking';
import * as LayeredKeyBinding from 'utils/layered-key-binding';


describe('SearchPage component', function () {
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
      pinboard: {},
    },
  };
  const store = MockStore()(state);

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
  });

  it('should not call get suggestion api when query is empty', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const resetSearchResultNavigationSpy = spy();
    mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage
            getSuggestion={ getSuggestionSpy }
            resetSearchResultNavigation={ resetSearchResultNavigationSpy }
            query=''
          />
        </MemoryRouter>
      </Provider>
    );
    clock.tick(600);

    getSuggestionSpy.should.not.be.called();
    resetSearchResultNavigationSpy.should.not.be.called();
  });

  it('should call get suggestion api when query is set', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const resetSearchResultNavigationSpy = spy();
    mount(
      <Provider store={ store }>
        <SearchPage
          getSuggestion={ getSuggestionSpy }
          resetSearchResultNavigation={ resetSearchResultNavigationSpy }
          query='a'
        />
      </Provider>
    );
    clock.tick(600);

    getSuggestionSpy.should.be.calledWith('a', { limit: 9 });
    resetSearchResultNavigationSpy.should.be.called();
  });

  it('should call browserHistory.push when user click on searchbar__button--back', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage cancelPathname='/pinboard/123abc/'/>
        </MemoryRouter>
      </Provider>
    );

    const backButton = wrapper.find('.searchbar__button--back').hostNodes();
    backButton.text().should.eql('Close');
    backButton.simulate('click');
    this.browserHistoryPush.should.be.calledOnce();
    this.browserHistoryPush.should.be.calledWith('/pinboard/123abc/');
  });

  it('should call router.goBack when user hit ESCAPE', function () {
    mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage />
        </MemoryRouter>
      </Provider>
    );

    Mousetrap.trigger('esc');
    this.browserHistoryPush.should.be.calledWith('/');
  });

  it('should bind and unbind esc and enter keys when mounted/unmounted but not hide', function () {
    const bindSpy = spy(LayeredKeyBinding, 'bind');
    const unbindSpy = spy(LayeredKeyBinding, 'unbind');

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage hide={ false }/>
        </MemoryRouter>
      </Provider>
    );

    const instance = wrapper.find(SearchPage).instance();
    bindSpy.should.be.calledWith('esc', instance.handleGoBack);
    bindSpy.should.be.calledWith('enter', instance.handleViewItem);

    wrapper.unmount();

    unbindSpy.should.be.calledWith('esc');
    unbindSpy.should.be.calledWith('enter');
  });

  it('should not bind and unbind esc and enter keys when mounted/unmounted but hide', function () {
    const bindSpy = spy(LayeredKeyBinding, 'bind');
    const unbindSpy = spy(LayeredKeyBinding, 'unbind');

    let wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage hide={ true }/>
        </MemoryRouter>
      </Provider>
    );

    bindSpy.should.not.be.calledWith('esc', match.any);
    bindSpy.should.not.be.calledWith('enter', match.any);

    wrapper.unmount();

    unbindSpy.should.not.be.calledWith('esc');
    unbindSpy.should.not.be.calledWith('enter');
  });

  it('should bind and unbind when update hide prop', function () {
    const bindSpy = spy(LayeredKeyBinding, 'bind');
    const unbindSpy = spy(LayeredKeyBinding, 'unbind');

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage hide={ true }/>
        </MemoryRouter>
      </Provider>
    );

    const instance = wrapper.find(SearchPage).instance();

    bindSpy.should.not.be.calledWith('esc', match.any);
    bindSpy.should.not.be.calledWith('enter', match.any);
    unbindSpy.should.not.be.calledWith('esc');
    unbindSpy.should.not.be.calledWith('enter');

    wrapper.setProps({
      children: (
        <MemoryRouter>
          <SearchPage hide={ false }/>
        </MemoryRouter>
      ),
    });

    bindSpy.should.be.calledWith('esc', instance.handleGoBack);
    bindSpy.should.be.calledWith('enter', instance.handleViewItem);
    unbindSpy.should.not.be.calledWith('esc');
    unbindSpy.should.not.be.calledWith('enter');

    wrapper.setProps({
      children: (
        <MemoryRouter>
          <SearchPage hide={ true } />
        </MemoryRouter>
      ),
    });

    unbindSpy.should.be.calledWith('esc');
    unbindSpy.should.be.calledWith('enter');
    unbindSpy.resetHistory();

    wrapper.setProps({
      children: (
        <MemoryRouter>
          <SearchPage hide={ false }/>
        </MemoryRouter>
      ),
    });

    wrapper.unmount();

    unbindSpy.should.be.calledWith('esc');
    unbindSpy.should.be.calledWith('enter');
  });

  it('should not change the current search path when user type in search box', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage searchTermsHidden={ false }/>
        </MemoryRouter>
      </Provider>
    );
    const searchBox = wrapper.find(SearchBox);
    searchBox.prop('onChange')({ currentTarget: { value: 'jer' } });
    this.browserHistoryPush.called.should.be.false();
  });

  it('should change the search box with correct text if there is queryPrefix', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <SearchPage query='jerome' queryPrefix='officer'/>
      </Provider>
    );
    const searchBox = wrapper.find(SearchBox);
    searchBox.prop('value').should.equal('officer:jerome');
  });

  describe('handleViewItem', function () {
    it('should use browserHistory.push() if visiting focused item with internal link', function () {
      mount(
        <Provider store={ store }>
          <MemoryRouter>
            <SearchPage focusedItem={ NavigationItem.build({ to: '/dummy/url' }) } />
          </MemoryRouter>
        </Provider>
      );
      Mousetrap.trigger('enter');
      this.browserHistoryPush.should.be.calledWith('/dummy/url');
    });

    it('should call handleSelect to show more suggestion items when entering on More button', function () {
      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <SearchPage
              focusedItem={ NavigationItem.build({ id: 'OFFICER', 'type': MORE_BUTTON }) }
            />
          </MemoryRouter>
        </Provider>
      );
      const handleSelectStub = stub(wrapper.find(SearchPage).instance(), 'handleSelect');
      Mousetrap.trigger('enter');
      handleSelectStub.calledWith('OFFICER');
    });

    it('should call handleSearchBoxEnter when user hits ENTER, there is no result and SearchBox is unfocused',
      function () {
        const navigateToSearchItem = stub(navigateUtils, 'navigateToSearchItem');
        mount(
          <Provider store={ store }>
            <SearchPage query='no-result'/>
          </Provider>
        );
        Mousetrap.trigger('down');
        Mousetrap.trigger('down');
        Mousetrap.trigger('enter');

        navigateToSearchItem.calledOnce.should.be.true();
      }
    );
  });

  it('should call api with content type when user select a tag', function () {
    const selectTagSpy = spy();
    const tags = ['a', 'b'];

    const wrapper = mount(
      <Provider store={ store }>
        <SearchPage
          selectTag={ selectTagSpy }
          tags={ tags }
          query={ 'a' }
        />
      </Provider>
    );

    const suggestionTagsElement = wrapper.find(SearchTags);
    const tagElements = suggestionTagsElement.find('span');
    tagElements.first().simulate('click');

    selectTagSpy.should.be.calledWith('a');
  });

  it('should not call api when select recent content', function () {
    const getSuggestionWithContentType = spy();
    const getSuggestion = stub().returns({ catch: spy() });
    const tags = [RECENT_CONTENT_TYPE, 'b'];
    const wrapper = mount(
      <Provider store={ store }>
        <SearchPage
          getSuggestionWithContentType={ getSuggestionWithContentType }
          getSuggestion={ getSuggestion }
          tags={ tags }
          query='a'
        />
      </Provider>
    );
    const suggestionTagsElement = wrapper.find(SearchTags);
    const tagElements = suggestionTagsElement.find('span');

    getSuggestion.reset();

    tagElements.first().simulate('click');
    getSuggestionWithContentType.called.should.be.false();
    getSuggestion.called.should.be.false();
  });

  it('should call selectTag(null) when user deselect a tag', function () {
    const tags = ['a', 'b'];
    const selectTagSpy = spy();

    const wrapper = mount(
      <Provider store={ store }>
        <SearchPage tags={ tags } selectTag={ selectTagSpy } contentType='a' query='c' />
      </Provider>
    );

    const suggestionTagsElement = wrapper.find(SearchTags);
    const tagElements = suggestionTagsElement.find('span');
    tagElements.first().simulate('click');
    selectTagSpy.should.be.calledWith(null);
  });

  it('should call resetSearchResultNavigation if SearchPage resetNavigation is called when Search Term is hidden',
    function () {
      const resetSearchResultNavigation = stub();
      const resetSearchTermNavigation = stub();

      const wrapper = shallow(
        <Provider store={ store }>
          <SearchPage
            resetSearchResultNavigation={ resetSearchResultNavigation }
            resetSearchTermNavigation={ resetSearchTermNavigation }
          />
        </Provider>
      );

      const searchPage = wrapper.find(SearchPage).dive();
      searchPage.instance().resetNavigation(1);
      resetSearchResultNavigation.should.be.calledWith(1);
    });

  it('should not call getSuggestion while query does not change', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const resetSearchResultNavigationSpy = spy();

    const wrapper = mount(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isRequesting={ false }
          query='abc'
          getSuggestion={ getSuggestionSpy }
          resetSearchResultNavigation={ resetSearchResultNavigationSpy }
        />
      </Provider>
    );

    clock.tick(600);
    getSuggestionSpy.should.be.calledOnce();
    getSuggestionSpy.resetHistory();
    resetSearchResultNavigationSpy.resetHistory();

    wrapper.setProps({
      children: (
        <SearchPage
          suggestionGroups={ [] }
          isRequesting={ true }
          query='abc'
          getSuggestion={ getSuggestionSpy }
          resetSearchResultNavigation={ resetSearchResultNavigationSpy }
        />
      ),
    });

    clock.tick(600);

    getSuggestionSpy.should.not.be.called();
    resetSearchResultNavigationSpy.should.not.be.called();
  });

  it('should throttle getSuggestion calls and only keep the call with the latest query', function () {
    const clock = useFakeTimers();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const resetSearchResultNavigationSpy = spy();

    const wrapper = mount(
      <Provider store={ store }>
        <SearchPage
          suggestionGroups={ ['abc'] }
          isRequesting={ false }
          query='abc'
          getSuggestion={ getSuggestionSpy }
          resetSearchResultNavigation={ resetSearchResultNavigationSpy }
        />
      </Provider>
    );

    wrapper.setProps({
      children: (
        <SearchPage
          suggestionGroups={ [] }
          isRequesting={ true }
          query='abcd'
          getSuggestion={ getSuggestionSpy }
          resetSearchResultNavigation={ resetSearchResultNavigationSpy }
        />
      ),
    });

    getSuggestionSpy.resetHistory();
    resetSearchResultNavigationSpy.resetHistory();

    wrapper.setProps({
      children: (
        <SearchPage
          suggestionGroups={ [] }
          isRequesting={ true }
          query='abcde'
          getSuggestion={ getSuggestionSpy }
          resetSearchResultNavigation={ resetSearchResultNavigationSpy }
        />
      ),
    });

    clock.tick(600);

    getSuggestionSpy.should.be.calledOnce();
    getSuggestionSpy.should.be.calledWith('abcde', { limit: 9 });
    resetSearchResultNavigationSpy.should.be.called();
  });

  it('should not call api when query changed to emtpy', function () {
    const clock = useFakeTimers();
    const selectTagSpy = spy();
    const getSuggestionSpy = stub().returns({ catch: spy() });
    const getSuggestionWithContentTypeSpy = stub().returns({ catch: spy() });

    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <SearchPage
            suggestionGroups={ ['abc'] }
            isEmpty={ false }
            isRequesting={ false }
            query='abc'
            selectTag={ selectTagSpy }
            getSuggestion={ getSuggestionSpy }
            getSuggestionWithContentType={ getSuggestionWithContentTypeSpy } />
        </MemoryRouter>
      </Provider>
    );
    selectTagSpy.resetHistory();

    clock.tick(600);
    getSuggestionSpy.should.be.calledOnce();
    getSuggestionSpy.resetHistory();

    wrapper.setProps({
      children: (
        <MemoryRouter>
          <SearchPage
            suggestionGroups={ ['abc'] }
            isEmpty={ false }
            isRequesting={ false }
            contentType='OFFICER'
            query=''
            selectTag={ selectTagSpy }
            getSuggestion={ getSuggestionSpy }
            getSuggestionWithContentType={ getSuggestionWithContentTypeSpy }
          />
        </MemoryRouter>
      ),
    });

    clock.tick(600);

    selectTagSpy.should.not.be.called();
    getSuggestionSpy.should.not.be.called();
    getSuggestionWithContentTypeSpy.should.not.be.called();
  });

  describe('Intercom', function () {
    describe('Intercom launcher', function () {
      beforeEach(function () {
        stub(intercomUtils, 'showIntercomLauncher');
      });

      it('should hide intercom launcher if search page is hidden', function () {
        mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchPage hide={ false }/>
            </MemoryRouter>
          </Provider>
        );
        intercomUtils.showIntercomLauncher.should.be.calledWith(false);
      });

      it('should show intercom launcher if search page is showing', function () {
        mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchPage hide={ true }/>
            </MemoryRouter>
          </Provider>
        );
        intercomUtils.showIntercomLauncher.should.be.calledWith(true);
      });

      it('should show intercom launcher again when unmounted', function () {
        const wrapper = mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchPage/>
            </MemoryRouter>
          </Provider>
        );

        wrapper.unmount();
        intercomUtils.showIntercomLauncher.should.be.calledWith(true);
      });

      it('should show intercom launcher when we go back from search page to landing page', function () {
        const wrapper = mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchPage hide={ false }/>
            </MemoryRouter>
          </Provider>
        );

        wrapper.setProps({
          children: (
            <MemoryRouter>
              <SearchPage hide={ true }/> }
            </MemoryRouter>
          ),
        });

        intercomUtils.showIntercomLauncher.should.be.calledWith(true);
      });

      it('should hide intercom launcher when we go to search page from landing page', function () {
        const wrapper = mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchPage hide={ true }/>
            </MemoryRouter>
          </Provider>
        );

        wrapper.setProps({
          children: (
            <MemoryRouter>
              <SearchPage hide={ false }/>
            </MemoryRouter>
          ),
        });

        intercomUtils.showIntercomLauncher.should.be.calledWith(false);
      });
    });

    describe('Intercom tracking', function () {
      beforeEach(function () {
        stub(IntercomTracking, 'trackSearchPage');
      });

      it('should track Intercom with search page', function () {
        mount(
          <Provider store={ store }>
            <MemoryRouter>
              <SearchPage/>
            </MemoryRouter>
          </Provider>
        );
        IntercomTracking.trackSearchPage.should.be.called();
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

    const wrapper = shallow(
      <Provider store={ store }>
        <SearchPage
          createNewEmptyPinboard={ createNewEmptyPinboardStub }
        />
      </Provider>
    );

    const searchPage = wrapper.find(SearchPage).dive();
    searchPage.instance().handleEmptyPinboardButtonClick();

    createNewEmptyPinboardStub.should.be.called();

    setTimeout(() => {
      this.browserHistoryPush.should.be.called();
      done();
    }, 50);
  });
});
