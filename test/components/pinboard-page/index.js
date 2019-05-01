import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { stub } from 'sinon';
import * as ReactRouter from 'react-router';
import { createStore as ReduxCreateStore } from 'redux';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import PinboardPageContainer from 'containers/pinboard-page';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinboardPaneSection from 'components/pinboard-page/pinboard-pane-section';
import RootReducer from 'reducers/root-reducer';
import FooterContainer from 'containers/footer-container';


describe('PinboardPage component', function () {
  let instance;
  const defaultPaginationState = {
    items: [],
    count: 0,
    pagination: { next: null, previous: null }
  };

  const pinboardPage = {
    graphData: {},
    geographicData: [],
    currentTab: 'NETWORK',
    relevantDocuments: defaultPaginationState,
    relevantCoaccusals: defaultPaginationState,
    relevantComplaints: defaultPaginationState,
  };

  const createStore = pinboard => MockStore()({
    pinboard,
    pinboardPage,
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should replace url on id change', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');
    const pinboard = {
      'id': '1',
      'officer_ids': [1, 2],
      'crids': [],
      'trr_ids': [],
    };
    const newPinboard = {
      'id': '2',
      'officer_ids': [3, 4],
      'crids': [],
      'trr_ids': [],
    };

    const state = {
      pinboard,
      pinboardPage,
      pathname: 'pinboard/abc123',
    };

    //We cannot use `rerender` together with `redux-mock-store` here as an existing store cannot be modified on the fly.
    const store = ReduxCreateStore(RootReducer, state);

    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    store.dispatch({
      type: 'PINBOARD_FETCH_REQUEST_SUCCESS',
      payload: newPinboard,
    });

    replaceStub.calledWith('/pinboard/2/').should.be.true();
    replaceStub.restore();
  });

  it('should not replace url if id is not changed', function () {
    const replaceStub = stub(ReactRouter.browserHistory, 'replace');
    const pinboard = {
      'id': '1',
      'officer_ids': [1, 2],
      'crids': [],
      'trr_ids': [],
    };

    instance = renderIntoDocument(
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>
    );
    reRender(
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>, instance
    );

    replaceStub.called.should.be.false();
    replaceStub.restore();
  });

  it('should render PinnedSection component', function () {
    const pinboard = {
      'id': '1',
      'officer_ids': [1, 2],
      'crids': [],
      'trr_ids': [],
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
  });

  it('should render pinboard page correctly', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      'officer_ids': [1, 2],
      'crids': [],
      'trr_ids': [],
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


