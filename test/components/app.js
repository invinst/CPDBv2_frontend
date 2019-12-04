import 'polyfill';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Mousetrap from 'mousetrap';
import React, { Component } from 'react';
import MockStore from 'redux-mock-store';
import { spy } from 'sinon';
import { ToastContainer } from 'react-toastify';

import App from 'components/app';
import ShareableHeader from 'components/headers/shareable-header';
import SlimHeader from 'components/headers/slim-header';
import SearchPageContainer from 'containers/search-page';
import OfficerPageContainer from 'containers/officer-page';
import { OFFICER_EDIT_TYPES } from 'utils/constants';


describe('App component', function () {
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

  it('should toggle edit mode when hit esc', function () {
    const toggleEditMode = spy();

    mount(
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

    toggleEditMode.should.be.calledWith('/');
  });

  it('should toggle search mode and change search query when press any key and not in search page', function () {
    const toggleSearchMode = spy();
    const changeSearchQuery = spy();

    mount(
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
    changeSearchQuery.should.be.calledWith('a');
  });

  it('should not toggle search mode and change search query when press any key and be in search page', function () {
    const toggleSearchMode = spy();
    const changeSearchQuery = spy();
    const location = { pathname: '/search/', search: '/', action: 'POP' };

    mount(
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
    const wrapper = mount(
      <Provider store={ store }>
        <App location={ location }>
          <SearchPageContainer location={ location } routes={ [] }/>
        </App>
      </Provider>
    );
    wrapper.find(SlimHeader).length.should.equal(0);
    wrapper.find(ShareableHeader).length.should.equal(0);
  });

  it('should display ShareableHeader if children is a shareable page', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <App location={ location }>
          <OfficerPageContainer location={ { query: {}, pathname: '/' } } />
        </App>
      </Provider>
    );
    wrapper.find(SlimHeader).length.should.equal(0);
    wrapper.find(ShareableHeader).exists().should.be.true();
  });

  it('should render ToastContainer', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <App location={ location }>
          <OfficerPageContainer location={ { query: {}, pathname: '/' } } />
        </App>
      </Provider>
    );

    const toastContainer = wrapper.find(ToastContainer);
    toastContainer.prop('pauseOnFocusLoss').should.be.false();
    toastContainer.prop('closeButton').should.be.false();
    toastContainer.prop('hideProgressBar').should.be.true();
    toastContainer.prop('autoClose').should.equal(3000);
    toastContainer.prop('className').should.equal('landing');
  });
});
