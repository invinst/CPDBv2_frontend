import 'polyfill';

import { Provider } from 'react-redux';
import { render } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import Mousetrap from 'mousetrap';
import React, { Component } from 'react';

import { spy } from 'sinon';
import { unmountComponentSuppressError } from 'utils/test';
import App from 'components/app';
import SearchPageContainer from 'containers/search-page-container';
import BottomSheetContainer from 'containers/bottom-sheet';
import MockStore from 'redux-mock-store';


describe('App component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {},
    adapter: 'adapter',
    reports: { 1: {} },
    faqs: { 1: {} },
    searchPage: {
      navigation: {}
    },
    bottomSheet: {
      officersAutoSuggest: {
        isRequesting: false,
        officers: []
      }
    }
  });
  const location = { pathname: '/', search: '/', action: 'POP' };

  class ChildComponent extends Component {
    render() {
      return <div/>;
    }
  }

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should keep previous children when displaying report', function () {
    let rootEl = document.createElement('div');
    instance = render(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'>
          <ChildComponent/>
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
    instance = render(
      <Provider store={ store }>
        <App
          params={ { reportId: 1 } }
          location={ location }
          appContent='/'>
          abc
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
  });

  it('should keep previous children when displaying faq', function () {
    let rootEl = document.createElement('div');
    instance = render(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'>
          <ChildComponent/>
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
    instance = render(
      <Provider store={ store }>
        <App
          params={ { faqId: 1 } }
          location={ location }
          appContent='/'>
          abc
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
  });

  it('should pass params to BottomSheetContainer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          params={ { reportId: 1 } }
          location={ location }
          appContent='/' />
      </Provider>
    );
    const element = findRenderedComponentWithType(instance, BottomSheetContainer);
    element.props.params.should.deepEqual({ reportId: 1 });
  });

  it('should toggle edit mode when hit esc', function () {
    const toggleEditMode = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          toggleEditMode={ toggleEditMode }
          location={ location }
          appContent='/' />
      </Provider>
    );

    Mousetrap.trigger('esc');

    toggleEditMode.calledWith('/').should.be.true();
  });

  it('should toggle search mode and change search query when press any key and not in search page', function () {
    const toggleSearchMode = spy();
    const changeSearchQuery = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          toggleSearchMode={ toggleSearchMode }
          changeSearchQuery={ changeSearchQuery }
          location={ location }
          isOnSearchPage={ false }
          appContent='/' />
      </Provider>
    );

    Mousetrap.trigger('a');

    toggleSearchMode.calledOnce.should.be.true();
    changeSearchQuery.calledOnce.should.be.true();
    changeSearchQuery.calledWith('a').should.be.true();
  });

  it('should not toggle search mode and change search query when press any key and be in search page', function () {
    const toggleSearchMode = spy();
    const changeSearchQuery = spy();
    const location = { pathname: '/search/', search: '/', action: 'POP' };

    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          toggleSearchMode={ toggleSearchMode }
          changeSearchQuery={ changeSearchQuery }
          location={ location }
          isOnSearchPage={ true }
          appContent='/'
        />
      </Provider>
    );

    Mousetrap.trigger('a');
    toggleSearchMode.called.should.be.false();
    changeSearchQuery.called.should.be.false();
  });

  it('should not display header if children is a SearchPageContainer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'
        >
          <SearchPageContainer location={ location }/>
        </App>
      </Provider>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--header-logo').length.should.eql(0);
  });

  it('should display header if children is not a SearchPageContainer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'>
          abc
        </App>
      </Provider>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--header-logo').length.should.not.eql(0);
  });

  it('should not update prevChildren if previous page is a bottom sheet', function () {
    let rootEl = document.createElement('div');
    instance = render(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'>
          <ChildComponent/>
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
    instance = render(
      <Provider store={ store }>
        <App
          params={ { reportId: 1 } }
          location={ location }
          appContent='/'>
          <div className='test-div'/>
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
    scryRenderedDOMComponentsWithClass(instance, 'test-div').length.should.eql(0);
    instance = render(
      <Provider store={ store }>
        <App
          params={ { faqId: 1 } }
          location={ location }
          appContent='/'>
          abc
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
    scryRenderedDOMComponentsWithClass(instance, 'test-div').length.should.eql(0);
  });
});
