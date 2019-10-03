import 'polyfill';
import { Provider } from 'react-redux';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import Mousetrap from 'mousetrap';
import React, { Component } from 'react';
import MockStore from 'redux-mock-store';
import { spy } from 'sinon';
import { ToastContainer } from 'react-toastify';

import { unmountComponentSuppressError } from 'utils/test';
import App from 'components/app';
import ShareableHeader from 'components/headers/shareable-header';
import SlimHeader from 'components/headers/slim-header';
import SearchPageContainer from 'containers/search-page';
import OfficerPageContainer from 'containers/officer-page';
import { OFFICER_EDIT_TYPES } from 'utils/constants';


describe('App component', function () {
  let instance;
  const mockStore = MockStore();
  const store = mockStore({
    authentication: {},
    adapter: 'adapter',
    landingPage: {
      activityGrid: {
        cards: [],
      },
    },
    searchPage: {
      tags: [],
      navigation: {},
      searchTerms: {
        hidden: true,
        navigation: {
          itemIndex: 0,
        },
        categories: [{
          name: 'Geography',
          items: [
            {
              id: 'community',
              name: 'Communities',
              description: 'Chicago is divided.',
              callToActionType: 'view_all',
              link: 'https://data.cpdp.co/url-mediator/session-builder?community=<name>',
            },
          ],
        }],
      },
      recentSuggestions: [],
    },
    cms: {
      pages: {},
    },
    officerPage: {
      summary: {},
      newTimeline: {},
      percentile: {
        isRequesting: false,
        items: [],
      },
      editModeOn: {
        [OFFICER_EDIT_TYPES.TRIANGLE]: false,
        [OFFICER_EDIT_TYPES.SCALE]: false,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
      },
      zipFileUrl: { withDocs: false, withoutDocs: false },
    },
    genericModal: {
      activeModal: null,
    },
    videoModal: {
      active: false,
    },
    breadcrumb: {
      breadcrumbs: [],
    },
    headers: {
      shareableHeader: {
        scrollPosition: 'top',
      },
      slimHeader: {
        logoSectionEditModeOn: false,
      },
    },
    popups: [],
    pinboardPage: {
      pinboard: null,
    },
    toast: {},
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

  it('should toggle edit mode when hit esc', function () {
    const toggleEditMode = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <App
          toggleEditMode={ toggleEditMode }
          location={ location }
        >
          <ChildComponent/>
        </App>
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
        >
          <ChildComponent/>
        </App>
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
        >
          <ChildComponent/>
        </App>
      </Provider>
    );

    Mousetrap.trigger('a');
    toggleSearchMode.called.should.be.false();
    changeSearchQuery.called.should.be.false();
  });

  it('should not display header if children is a "headerless page"', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App location={ location }>
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
        <App location={ location }>
          <OfficerPageContainer location={ { query: {}, pathname: '/' } } />
        </App>
      </Provider>
    );
    scryRenderedComponentsWithType(instance, SlimHeader).length.should.eql(0);
    findRenderedComponentWithType(instance, ShareableHeader);
  });

  it('should render ToastContainer', function () {
    instance = renderIntoDocument(
      <Provider store={ store }>
        <App location={ location }>
          <OfficerPageContainer location={ { query: {}, pathname: '/' } } />
        </App>
      </Provider>
    );

    const toastContainer = findRenderedComponentWithType(instance, ToastContainer);
    toastContainer.props.pauseOnFocusLoss.should.be.false();
    toastContainer.props.closeButton.should.be.false();
    toastContainer.props.hideProgressBar.should.be.true();
    toastContainer.props.autoClose.should.equal(3000);
    toastContainer.props.className.should.equal('landing');
  });
});
