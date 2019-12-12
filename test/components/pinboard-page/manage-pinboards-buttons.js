import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate, findRenderedComponentWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { spy, stub } from 'sinon';
import { Promise } from 'es6-promise';
import { browserHistory, Router, Route, createMemoryHistory } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import ManagePinboardsButtons from 'components/pinboard-page/manage-pinboards-buttons';


describe('ManagePinboardsButtons component', function () {
  const store = MockStore()({
    pinboardPage: {
      pinboard: {
        saving: false,
      },
    },
  });
  let instance;

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    this.browserHistoryPush.restore();
  });

  it('should render show pinboards list button', function () {
    const showPinboardsListSpy = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <ManagePinboardsButtons showPinboardsList={ showPinboardsListSpy } />
      </Provider>
    );

    const showPinboardsListButton = findRenderedDOMComponentWithClass(instance, 'pinboards-list-btn');
    Simulate.click(showPinboardsListButton);

    showPinboardsListSpy.should.be.called();
  });

  it('should render new pinboard button', function () {
    const managePinboardsButtons = () => (
      <Provider store={ store }>
        <ManagePinboardsButtons />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ managePinboardsButtons } />
      </Router>
    );

    const managePinboardsButtonsComponent = findRenderedComponentWithType(instance, ManagePinboardsButtons);
    scryRenderedDOMComponentsWithClass(instance, 'new-pinboard-menu').should.have.length(0);
    const newPinboardButton = findRenderedDOMComponentWithClass(instance, 'new-pinboard-menu-btn');
    Simulate.click(newPinboardButton);

    managePinboardsButtonsComponent.state.showNewPinboardMenu.should.be.true();
    findRenderedDOMComponentWithClass(instance, 'new-pinboard-menu');
    Simulate.click(newPinboardButton);

    managePinboardsButtonsComponent.state.showNewPinboardMenu.should.be.false();
    scryRenderedDOMComponentsWithClass(instance, 'new-pinboard-menu').should.have.length(0);
  });

  it('should render new-pinboard-link', function (done) {
    const createNewEmptyPinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });

    const managePinboardsButtons = () => (
      <Provider store={ store }>
        <ManagePinboardsButtons createNewEmptyPinboard={ createNewEmptyPinboardStub }/>
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ managePinboardsButtons } />
      </Router>
    );

    const newPinboardButton = findRenderedDOMComponentWithClass(instance, 'new-pinboard-menu-btn');
    Simulate.click(newPinboardButton);
    const newPinboardLink = findRenderedDOMComponentWithClass(instance, 'new-pinboard-link');
    Simulate.click(newPinboardLink);
    createNewEmptyPinboardStub.should.be.called();

    setTimeout(() => {
      this.browserHistoryPush.should.be.calledWith('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });

  it('should render duplicate-current-pinboard-link', function (done) {
    const duplicatePinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });

    const managePinboardsButtons = () => (
      <Provider store={ store }>
        <ManagePinboardsButtons pinboardId='66ef1560' duplicatePinboard={ duplicatePinboardStub }/>
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ managePinboardsButtons } />
      </Router>
    );

    const newPinboardButton = findRenderedDOMComponentWithClass(instance, 'new-pinboard-menu-btn');
    Simulate.click(newPinboardButton);
    const newPinboardLink = findRenderedDOMComponentWithClass(instance, 'duplicate-current-pinboard-link');
    Simulate.click(newPinboardLink);
    duplicatePinboardStub.should.be.calledWith('66ef1560');
    setTimeout(() => {
      this.browserHistoryPush.should.be.calledWith('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });
});
