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
import SearchPage from 'components/search-page';
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

  it('should toggle search mode when press any key', function () {
    const toggleSearchMode = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          toggleSearchMode={ toggleSearchMode }
          location={ location }
          appContent='/' />
      </Provider>
    );

    Mousetrap.trigger('a');

    toggleSearchMode.calledOnce.should.be.true();
  });

  it('should not display header if children is a SearchPage', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          location={ location }
          appContent='/'>
          <SearchPage/>
        </App>
      </Provider>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--header-logo').length.should.eql(0);
  });

  it('should display header if children is not a SearchPage', function () {
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
