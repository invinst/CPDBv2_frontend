import React from 'react';
import { browserHistory, Router, Route, createMemoryHistory } from 'react-router';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass, Simulate,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Promise } from 'es6-promise';
import { spy, stub } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import Pinboards from 'components/pinboard-page/pinboards';


describe('Pinboards component', function () {
  const store = MockStore()({
    pinboardPage: {
      pinboard: {
        saving: false,
      },
    },
  });
  let instance;

  const pinboards = [
    {
      id: '1',
      title: 'Pinboard Title',
      createdAt: 'Sep 12, 2019',
      url: '/pinboard/1/pinboard-title/',
    },
    {
      id: '2',
      title: '',
      createdAt: 'Oct 15, 2019',
      url: '/pinboard/2/untitled-pinboard/',
    },
  ];

  beforeEach(function () {
    this.browserHistoryPush = stub(browserHistory, 'push');
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
    this.browserHistoryPush.restore();
  });

  it('should render pinboard items', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <Pinboards pinboards={ pinboards } isShown={ true } />
      </Provider>
    );

    findRenderedDOMComponentWithClass(instance, 'pinboards-title').textContent.should.eql('Pinboards');

    const pinboardItems = scryRenderedDOMComponentsWithClass(instance, 'pinboard-item');
    pinboardItems.should.have.length(2);

    const pinboardTitles = scryRenderedDOMComponentsWithClass(instance, 'pinboard-title');
    const pinboardCreatedAts = scryRenderedDOMComponentsWithClass(instance, 'pinboard-created-at');

    pinboardTitles[0].textContent.should.eql('Pinboard Title');
    pinboardCreatedAts[0].textContent.should.eql('Created Sep 12, 2019');

    pinboardTitles[1].textContent.should.eql('');
    pinboardCreatedAts[1].textContent.should.eql('Created Oct 15, 2019');
  });

  it('should not render pinboard list if isShown is false', function () {
    instance = renderIntoDocument(
      <Pinboards pinboards={ pinboards } isShown={ false } />
    );

    scryRenderedDOMComponentsWithClass(instance, 'pinboards-title').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'pinboard-item').should.have.length(0);
  });

  describe('componentWillReceiveProps', function () {
    it('should fetchPinboards if isShow change from false to true', function () {
      const fetchPinboardsSpy = spy();

      instance = renderIntoDocument(
        <Provider store={ store }>
          <Pinboards pinboards={ pinboards } isShown={ false } fetchPinboards={ fetchPinboardsSpy } />
        </Provider>
      );

      fetchPinboardsSpy.should.not.be.called();

      instance = reRender(
        <Provider store={ store }>
          <Pinboards pinboards={ pinboards } isShown={ true } fetchPinboards={ fetchPinboardsSpy } />
        </Provider>,
        instance,
      );

      fetchPinboardsSpy.should.be.called();
    });
  });

  it('should render new-pinboard-btn', function (done) {
    const createNewEmptyPinboardStub = stub().usingPromise(Promise).resolves({
      payload: {
        id: '5cd06f2b',
        title: 'Pinboard title',
      },
    });
    const handleCloseSpy = spy();

    const pinboardsList = () => (
      <Provider store={ store }>
        <Pinboards
          isShown={ true }
          pinboards={ pinboards }
          createNewEmptyPinboard={ createNewEmptyPinboardStub }
          handleClose={ handleCloseSpy }
        />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardsList } />
      </Router>
    );

    const newPinboardLink = findRenderedDOMComponentWithClass(instance, 'new-pinboard-btn');
    Simulate.click(newPinboardLink);
    createNewEmptyPinboardStub.should.be.called();

    setTimeout(() => {
      handleCloseSpy.should.be.called();
      this.browserHistoryPush.should.be.calledWith('/pinboard/5cd06f2b/pinboard-title/');
      done();
    }, 50);
  });
});
