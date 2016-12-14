import React, { Component } from 'react';
import should from 'should';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { render } from 'react-dom';
import { stub, spy } from 'sinon';
import Mousetrap from 'mousetrap';
import {
  renderIntoDocument, findRenderedComponentWithType, scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import 'polyfill';
import { unmountComponentSuppressError } from 'utils/test';
import App from 'components/app';
import BottomSheetContainer from 'containers/bottom-sheet';
import { REPORT_TYPE, FAQ_TYPE } from 'actions/bottom-sheet';


describe('App component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({ authentication: {}, adapter: 'adapter' });

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
          location={ { pathname: '/', search: '/', action: 'POP' } }
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
          location={ { pathname: '/', search: '/', action: 'POP' } }
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
          location={ { pathname: '/', search: '/', action: 'POP' } }
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
          location={ { pathname: '/', search: '/', action: 'POP' } }
          appContent='/'>
          abc
        </App>
      </Provider>,
      rootEl
    );
    scryRenderedComponentsWithType(instance, ChildComponent).length.should.eql(1);
  });

  it('should pass report content to BottomSheetContainer when having report id', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          params={ { reportId: 1 } }
          location={ { pathname: '/', search: '/', action: 'POP' } }
          appContent='/' />
      </Provider>
    );
    const element = findRenderedComponentWithType(instance, BottomSheetContainer);
    element.props.content.should.deepEqual({
      id: 1,
      type: REPORT_TYPE
    });
  });

  it('should pass faq content to BottomSheetContainer when having faq id', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          params={ { faqId: 1 } }
          location={ { pathname: '/', search: '/', action: 'POP' } }
          appContent='/' />
      </Provider>
    );
    const element = findRenderedComponentWithType(instance, BottomSheetContainer);
    element.props.content.should.deepEqual({
      id: 1,
      type: FAQ_TYPE
    });
  });

  it('should pass null content to BottomSheetContainer when having no report or faq', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          location={ { pathname: '/', search: '/', action: 'POP' } }
          appContent='/' />
      </Provider>
    );
    window.scrollY = 150;
    const element = findRenderedComponentWithType(instance, BottomSheetContainer);
    should(element.props.content).be.null();
  });

  it('should toggle edit mode when hit esc', function () {
    const toggleEditMode = spy();
    let triggerESC;
    //FIXME: Fix this workaround
    stub(Mousetrap, 'bind', (event, cb) => {
      if (event == 'esc') {
        triggerESC = cb;
      }
    });

    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          toggleEditMode={ toggleEditMode }
          location={ { pathname: '/', search: '/', action: 'POP' } }
          appContent='/' />
      </Provider>
    );

    triggerESC();
    toggleEditMode.calledWith('/').should.be.true();
    Mousetrap.bind.restore();
  });
});
