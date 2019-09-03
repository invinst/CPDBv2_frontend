import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { stub, spy } from 'sinon';
import * as ReactRouter from 'react-router';
import { Router, createMemoryHistory, Route } from 'react-router';
import { createStore as ReduxCreateStore } from 'redux';
import should from 'should';
import { set } from 'lodash';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import PinboardPageContainer from 'containers/pinboard-page';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import SearchBar from 'components/pinboard-page/search-bar';
import { PinboardPaneSectionWithSpinner } from 'components/pinboard-page/pinboard-pane-section';
import RootReducer from 'reducers/root-reducer';
import FooterContainer from 'containers/footer-container';
import {
  PINBOARD_PAGE_REDIRECT,
  PINBOARD_PAGE_FOCUS_ITEM,
  PINBOARD_FETCH_REQUEST_SUCCESS,
  PINBOARD_EDIT_TYPES,
} from 'utils/constants';
import PinboardPage from 'components/pinboard-page';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import EmptyPinboardPage from 'components/pinboard-page/empty-pinboard';
import { buildEditStateFields } from 'utils/test/factories/draft';


describe('PinboardPage component', function () {
  let instance;
  const defaultPaginationState = {
    requesting: false,
    items: [],
    count: 0,
    pagination: { next: null, previous: null },
  };

  const createPinboardPage = (pinboard, editModeOn) => ({
    graphData: { requesting: false, data: {} },
    geographicData: { requesting: false, data: [] },
    currentTab: 'NETWORK',
    relevantDocuments: defaultPaginationState,
    relevantCoaccusals: defaultPaginationState,
    relevantComplaints: defaultPaginationState,
    crItems: { requesting: false, items: [] },
    officerItems: { requesting: false, items: [] },
    trrItems: { requesting: false, items: [] },
    redirect: false,
    initialRequested: true,
    focusedItem: {},
    pinboard,
    editModeOn,
  });

  const defaultFields = buildEditStateFields({
    'empty_pinboard_title': ['Get started'],
    'empty_pinboard_description': [
      'Use search to find officers and individual complaint records and ' +
      'press the plus button to add cards to your pinboard.',
      '',
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.',
    ],
  });

  const defaultEditModeOn = {
    [PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_TITLE]: false,
    [PINBOARD_EDIT_TYPES.EMPTY_PINBOARD_DESCRIPTION]: false,
  };

  const createStore = (pinboard, editModeOn=defaultEditModeOn, fields=defaultFields) => MockStore()({
    pinboardPage: createPinboardPage(pinboard, editModeOn),
    cms: {
      pages: {
        'pinboard-page': {
          fields,
        },
      },
    },
  });

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render nothing if initialRequested is false', function () {
    const pinboard = {
      'id': '5cd06f2b',
      'title': 'Pinboard title',
    };

    const state = {
      pinboardPage: createPinboardPage(pinboard),
      pathname: 'pinboard/5cd06f2b',
    };
    state.pinboardPage.initialRequested = false;

    const store = ReduxCreateStore(RootReducer, state);

    const pinboardPage = () => (
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

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

    const pinboardPage = () => (
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    store.dispatch({
      type: PINBOARD_PAGE_REDIRECT,
      payload: true,
    });

    replaceStub.should.not.be.called();

    store.dispatch({
      type: PINBOARD_FETCH_REQUEST_SUCCESS,
      payload: {
        id: '66ef1560',
        title: 'Title',
        description: 'Description',
        'officer_ids': [1],
        crids: ['abc'],
        'trr_ids': [1],
      },
    });

    replaceStub.should.be.calledWith('/pinboard/66ef1560/title/');
    replaceStub.restore();
  });

  it('should called updatePathName when componentDidUpdate if title is updated', function () {
    const updatePathNameStub = stub();
    const pinboard = {
      'id': '5cd06f2b',
      'title': 'Pinboard title',
      'url': '/pinboard/5cd06f2b/pinboard-title/',
    };
    const updatedPinboard = {
      'id': '5cd06f2b',
      'title': 'Pinboard title',
      'url': '/pinboard/5cd06f2b/updated-title/',
    };
    const state = {
      pinboardPage: createPinboardPage(pinboard),
      pathname: 'pinboard/5cd06f2b',
    };
    const store = ReduxCreateStore(RootReducer, state);

    instance = renderIntoDocument(
      <Provider store={ store }>
        <PinboardPage updatePathName={ updatePathNameStub } pinboard={ pinboard } initialRequested={ true }/>
      </Provider>
    );

    instance = reRender(
      <Provider store={ store }>
        <PinboardPage updatePathName={ updatePathNameStub } pinboard={ updatedPinboard } initialRequested={ true }/>
      </Provider>,
      instance
    );

    updatePathNameStub.should.be.calledWith('/pinboard/5cd06f2b/updated-title/');
  });

  it('should render PinnedSection component and SearchBar component', function () {
    const pinboard = {
      'id': '5cd06f2b',
      'crids': ['123'],
    };

    const pinboardPage = () => (
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
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
      crids: ['123'],
    };

    const pinboardPage = () => (
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    findRenderedComponentWithType(instance, PinboardPaneSectionWithSpinner);

    findRenderedComponentWithType(instance, RelevantSectionContainer);
    const footer = findRenderedComponentWithType(instance, FooterContainer);
    footer.props.className.should.eql('footer');
  });

  it('should render EmptyPinboard instead of pinboard contents if pinboard is empty', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      'example_pinboards': [{
        id: '66ef1561',
        title: 'Pinboard 1',
        description: 'Description 1',
      }, {
        id: '66ef1562',
        title: 'Pinboard 2',
        description: 'Description 2',
      }],
    };

    const pinboardPage = () => (
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    findDOMNode(findRenderedComponentWithType(instance, PinboardPage)).className.should.containEql('empty');

    scryRenderedComponentsWithType(instance, PinboardPaneSectionWithSpinner).should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'pinboard-title').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'pinboard-description').should.have.length(0);
    scryRenderedComponentsWithType(instance, RelevantSectionContainer).should.have.length(0);

    findRenderedComponentWithType(instance, SearchBar).props.shareable.should.be.false();

    const emptyPinboard = findRenderedComponentWithType(instance, EmptyPinboardPage);
    emptyPinboard.props.examplePinboards.should.eql([{
      id: '66ef1561',
      title: 'Pinboard 1',
      description: 'Description 1',
    }, {
      id: '66ef1562',
      title: 'Pinboard 2',
      description: 'Description 2',
    }]);

    findRenderedComponentWithType(instance, FooterContainer);
  });

  it('should push pinboard into breadcrumbs', function () {
    const location = { pathname: '/pinboard/66ef1560/' };
    const params = {};
    const routes = [];
    const stubPushBreadcrumbs = stub();
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
    };

    instance = renderIntoDocument(
      <Provider store={ createStore(pinboard) }>
        <PinboardPage
          pinboard={ pinboard }
          location={ location }
          params={ params }
          routes={ routes }
          pushBreadcrumbs={ stubPushBreadcrumbs }
        />
      </Provider>
    );
    stubPushBreadcrumbs.calledWith({ location, params, routes }).should.be.true();
  });

  it('should contain overlay and preview pane', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      crids: ['123'],
    };

    const pinboardPage = () => (
      <Provider store={ createStore(pinboard) }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    findRenderedDOMComponentWithClass(instance, 'overlay').should.be.ok();
    findRenderedComponentWithType(instance, PreviewPane).should.be.ok();
  });

  it('should hide overlay if there is no focused item by default', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      crids: ['123'],
    };

    const pinboardPageData = createPinboardPage(pinboard);
    set(pinboardPageData, 'crItems', [{ 'crid': '123' }]);

    const state = {
      pinboardPage: pinboardPageData,
      pathname: 'pinboard/5cd06f2b',
    };

    const store = ReduxCreateStore(RootReducer, state);

    const pinboardPage = () => (
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    store.dispatch({
      type: PINBOARD_PAGE_FOCUS_ITEM,
      payload: {},
    });

    const overlay = findRenderedDOMComponentWithClass(instance, 'overlay');
    overlay.getAttribute('aria-hidden').should.equal('true');

    document.body.classList.should.have.length(2);
    document.body.classList.contains('body-scrollable').should.be.true();
  });

  it('should display overlay if there is focused item', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      crids: ['123'],
    };

    const pinboardPageData = createPinboardPage(pinboard);
    set(pinboardPageData, 'crItems', { requesting: false, items: [{ 'crid': '123' }] });

    const state = {
      pinboardPage: pinboardPageData,
      pathname: 'pinboard/5cd06f2b',
    };

    const store = ReduxCreateStore(RootReducer, state);

    const pinboardPage = () => (
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    store.dispatch({
      type: PINBOARD_PAGE_FOCUS_ITEM,
      payload: {
        type: 'CR',
        id: '123',
      },
    });

    const overlay = findRenderedDOMComponentWithClass(instance, 'overlay');
    overlay.getAttribute('aria-hidden').should.equal('false');

    document.body.classList.should.have.length(2);
    document.body.classList.contains('body-not-scrollable').should.be.true();
  });

  it('should handle on overlay click', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      crids: ['123'],
    };

    const pinboardPageData = createPinboardPage(pinboard);
    set(pinboardPageData, 'crItems', { requesting: false, items: [{ 'crid': '123' }] });

    const state = {
      pinboardPage: pinboardPageData,
      pathname: 'pinboard/5cd06f2b',
    };

    const store = ReduxCreateStore(RootReducer, state);

    const pinboardPage = () => (
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    store.dispatch({
      type: PINBOARD_PAGE_FOCUS_ITEM,
      payload: {
        type: 'CR',
        id: '123',
      },
    });

    const overlay = findRenderedDOMComponentWithClass(instance, 'overlay');
    overlay.getAttribute('aria-hidden').should.equal('false');
    document.body.classList.should.have.length(2);
    document.body.classList.contains('body-not-scrollable').should.be.true();

    Simulate.click(overlay);

    overlay.getAttribute('aria-hidden').should.equal('true');
    document.body.classList.should.have.length(2);
    document.body.classList.contains('body-scrollable').should.be.true();
  });

  it('should handle when pin status is changed from preview pane', function () {
    const pinboard = {
      title: 'This is pinboard title',
      description: 'This is pinboard description',
      'officer_ids': [123],
    };
    const pinboardPageData = createPinboardPage(pinboard);
    set(pinboardPageData, 'officerItems', { requesting: false, items: [{ id: 123 }], removingItems: [] });
    const state = {
      pinboardPage: pinboardPageData,
      pathname: 'pinboard/5cd06f2b',
    };
    const store = ReduxCreateStore(RootReducer, state);
    const handlePinChangedOnPreviewPane = spy(PinboardPage.prototype, 'handlePinChangedOnPreviewPane');

    const pinboardPage = () => (
      <Provider store={ store }>
        <PinboardPageContainer />
      </Provider>
    );

    instance = renderIntoDocument(
      <Router history={ createMemoryHistory() }>
        <Route path='/' component={ pinboardPage } />
      </Router>
    );

    store.dispatch({
      type: PINBOARD_PAGE_FOCUS_ITEM,
      payload: {
        type: 'OFFICER',
        id: 123,
      },
    });

    const pinButton = findRenderedDOMComponentWithClass(instance, 'pin-button');
    Simulate.click(pinButton);

    handlePinChangedOnPreviewPane.should.be.calledWith({
      type: 'OFFICER',
      id: 123,
      isPinned: true,
    });

    handlePinChangedOnPreviewPane.restore();
  });
});
