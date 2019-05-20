import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import * as ReactRouter from 'react-router';
import { createStore as ReduxCreateStore } from 'redux';
import should from 'should';

import { unmountComponentSuppressError } from 'utils/test';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import PinboardPageContainer from 'containers/pinboard-page';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import SearchBar from 'components/pinboard-page/search-bar';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RootReducer from 'reducers/root-reducer';
import FooterContainer from 'containers/footer-container';
import { PINBOARD_PAGE_REDIRECT, PINBOARD_PAGE_INITIAL_LOADING } from 'utils/constants';


describe('PinboardPage component', function () {
  let instance;
  const defaultPaginationState = {
    items: [],
    count: 0,
    pagination: { next: null, previous: null }
  };

  const createPinboardPage = pinboard => ({
    graphData: {},
    geographicData: [],
    currentTab: 'NETWORK',
    relevantDocuments: defaultPaginationState,
    relevantCoaccusals: defaultPaginationState,
    relevantComplaints: defaultPaginationState,
    redirection: {
      redirect: false,
      initialLoading: false,
    },
    pinboard
  });

  const createStore = pinboard => MockStore()({
    pinboardPage: createPinboardPage(pinboard),
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing if isInitiallyLoading is true', function () {
    const pinboard = {
      'id': '5cd06f2b',
      'title': 'Pinboard title',
    };

    const state = {
      pinboardPage: createPinboardPage(pinboard),
      pathname: 'pinboard/5cd06f2b',
    };

    const store = ReduxCreateStore(RootReducer, state);

    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    store.dispatch({
      type: PINBOARD_PAGE_INITIAL_LOADING,
      payload: true,
    });

    should(findDOMNode(instance)).be.null();
  });

  it('should replace url when shouldRedirect is True after updating', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');

    const pinboard = {
      'id': '5cd06f2b',
      'title': 'Pinboard title',
    };

    const state = {
      pinboardPage: createPinboardPage(pinboard),
      pathname: 'pinboard/5cd06f2b',
    };

    const store = ReduxCreateStore(RootReducer, state);

    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    store.dispatch({
      type: PINBOARD_PAGE_REDIRECT,
      payload: true,
    });

    replaceStub.calledWith('/pinboard/5cd06f2b/pinboard-title/').should.be.true();
    replaceStub.restore();
  });

  it('should render PinnedSection component and SearchBar component', function () {
    const pinboard = {
      'id': '5cd06f2b',
    };

    instance = renderIntoDocument(
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>
    );

    findRenderedDOMComponentWithClass(instance, 'pinned-section');
    findRenderedComponentWithType(instance, PinnedOfficersContainer);
    findRenderedComponentWithType(instance, PinnedCRsContainer);
    findRenderedComponentWithType(instance, PinnedTRRsContainer);
    findRenderedComponentWithType(instance, SearchBar);
  });

  it('should render pinboard page correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };

    instance = renderIntoDocument(
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>
    );

    findRenderedComponentWithType(instance, PinboardPaneSection);
    findRenderedDOMComponentWithClass(instance, 'pinboard-title').textContent.should.eql(
      'This is pinboard title'
    );
    findRenderedDOMComponentWithClass(instance, 'pinboard-description').textContent.should.eql(
      'This is pinboard description'
    );

    findRenderedComponentWithType(instance, RelevantSectionContainer);
    const footer = findRenderedComponentWithType(instance, FooterContainer);
    footer.props.className.should.eql('footer');
  });
});
