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
import ShareableHeader from 'components/headers/shareable-header';
import SlimHeader from 'components/headers/slim-header';
import SearchPageContainer from 'containers/search-page-container';
import BottomSheetContainer from 'containers/bottom-sheet';
import OfficerPageContainer from 'containers/officer-page';
import MockStore from 'redux-mock-store';


describe('App component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {},
    adapter: 'adapter',
    reports: { 1: {} },
    faqs: { 1: {} },
    landingPage: {
      activityGrid: {
        cards: []
      }
    },
    searchPage: {
      tags: [],
      navigation: {},
      searchTerms: {
        hidden: true
      }
    },
    cms: {
      pages: {}
    },
    bottomSheet: {
      officersAutoSuggest: {
        isRequesting: false,
        officers: []
      }
    },
    officerPage: {
      summary: {},
      timeline: {
        filters: {}
      }
    },
    genericModal: {
      activeModal: null
    },
    breadcrumb: {
      breadcrumbs: []
    },
    headers: {
      shareableHeader: {
        scrollPosition: 'top'
      },
      slimHeader: {
        logoSectionEditModeOn: false
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
          appContent='/'
        />
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
          appContent='/'
        />
      </Provider>
    );

    Mousetrap.trigger('a');
    toggleSearchMode.called.should.be.false();
    changeSearchQuery.called.should.be.false();
  });

  it('should not display header if children is a "headerless page"', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'
        >
          <SearchPageContainer location={ location } routes={ [] }/>
        </App>
      </Provider>
    );
    scryRenderedComponentsWithType(instance, SlimHeader).length.should.eql(0);
    scryRenderedComponentsWithType(instance, ShareableHeader).length.should.eql(0);
  });

  it('should display ShareableHeader if children is a shareable page', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'
        >
          <OfficerPageContainer location={ { query: {} } } />
        </App>
      </Provider>
    );
    scryRenderedComponentsWithType(instance, SlimHeader).length.should.eql(0);
    findRenderedComponentWithType(instance, ShareableHeader);
  });

  it('should display SlimHeader by default', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'
        >
          asdf
        </App>
      </Provider>
    );
    scryRenderedComponentsWithType(instance, ShareableHeader).length.should.eql(0);
    findRenderedComponentWithType(instance, SlimHeader);
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
