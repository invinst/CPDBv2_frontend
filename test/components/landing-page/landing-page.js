import React from 'react';
import { spy, stub } from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import DocumentMeta from 'react-document-meta';

import LandingPage from 'components/landing-page';
import SlimHeader from 'components/headers/slim-header';
import HeatMap from 'components/landing-page/heat-map';
import OfficersByAllegation from 'components/landing-page/officers-by-allegation';
import RecentActivity from 'components/landing-page/recent-activity';
import RecentDocument from 'components/landing-page/recent-document';
import ComplaintSummaries from 'components/landing-page/complaint-summaries';
import Footer from 'components/footer';
import styles from 'components/landing-page/landing-page.sass';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';
import { reRender, unmountComponentSuppressError } from 'utils/test';
import SearchPage from 'components/search-page';
import * as DomUtils from 'utils/dom';

const mockStore = configureStore();
const store = mockStore({
  authentication: {},
  cms: {
    pages: {
    },
  },
  landingPage: {
    heatMap: {
      citySummary: {},
      communities: null,
    },
    activityGrid: {
      cards: [
        RawOfficerCardFactory.build(),
        RawOfficerCardFactory.build(),
        RawOfficerCardFactory.build(),
      ],
      headerEditModeOn: false,
    },
    officersByAllegation: {
      cards: [
        RawOfficerCardFactory.build({ kind: '' }),
        RawOfficerCardFactory.build({ kind: '' }),
        RawOfficerCardFactory.build({ kind: '' }),
      ],
      headerEditModeOn: false,
    },
    recentDocument: {
      cards: [
        RawDocumentCardFactory.build(),
        RawDocumentCardFactory.build(),
      ],
      headerEditModeOn: false,
    },
    complaintSummaries: {
      cards: [
        ComplaintSummaryFactory.build(),
        ComplaintSummaryFactory.build(),
      ],
      headerEditModeOn: false,
    },
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
  searchPage: {
    tags: [],
    navigation: {},
    searchTerms: {
      categories: [],
      hidden: true,
      navigation: {
        itemIndex: 0,
      },
    },
    pagination: {},
  },
  pinboardPage: {
    pinboard: null,
  },
  toast: {},
});

describe('LandingPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be responsively renderable', function () {
    const stubResetBreadcrumbs = stub();
    LandingPage.should.be.responsiveRenderable({
      store: store,
      resetBreadcrumbs: stubResetBreadcrumbs,
      location: { pathname: '/' },
    });
  });

  it('should render enough content', function () {
    const stubResetBreadcrumbs = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          location={ { pathname: '/' } }
        />
      </Provider>
    );

    const documentMeta = scryRenderedComponentsWithType(instance, DocumentMeta)[0];
    documentMeta.props.title.should.equal('CPDP');

    const landingPageContent = findRenderedDOMComponentWithClass(documentMeta, styles.landingPage);
    landingPageContent.getAttribute('class').should.not.containEql('animation-in').and.not.containEql('hide');

    const slimHeader = findRenderedComponentWithType(documentMeta, SlimHeader);
    slimHeader.props.pathname.should.equal('/');

    findRenderedComponentWithType(documentMeta, HeatMap).should.be.ok();
    findRenderedComponentWithType(documentMeta, OfficersByAllegation).should.be.ok();
    findRenderedComponentWithType(documentMeta, RecentActivity).should.be.ok();
    findRenderedComponentWithType(documentMeta, RecentDocument).should.be.ok();
    findRenderedComponentWithType(documentMeta, ComplaintSummaries).should.be.ok();
    findRenderedComponentWithType(documentMeta, Footer).should.be.ok();

    const searchPage = findRenderedComponentWithType(instance, SearchPage);
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.true();
  });

  it('should hide landing page content and show search page when pathname is /search/', function () {
    const stubResetBreadcrumbs = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          location={ { pathname: '/search/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
          ] }
        />
      </Provider>
    );

    const landingPageContent = findRenderedDOMComponentWithClass(instance, styles.landingPage);
    landingPageContent.getAttribute('class').should.containEql('hide').and.not.containEql('animation-in');

    const searchPage = findRenderedComponentWithType(instance, SearchPage);
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.false();
  });

  it('should able to open landing page edit mode', function () {
    const stubResetBreadcrumbs = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          location={ { pathname: '/edit/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
          ] }
        />
      </Provider>
    );

    const landingPageContent = findRenderedDOMComponentWithClass(instance, styles.landingPage);
    const searchPage = findRenderedComponentWithType(instance, SearchPage);

    landingPageContent.getAttribute('class').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.true();
  });

  it('should able to open search page edit mode', function () {
    const stubResetBreadcrumbs = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          location={ { pathname: '/edit/search/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
          ] }
        />
      </Provider>
    );

    const landingPageContent = findRenderedDOMComponentWithClass(instance, styles.landingPage);
    landingPageContent.getAttribute('class').should.containEql('hide').and.not.containEql('animation-in');

    const searchPage = findRenderedComponentWithType(instance, SearchPage);
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.false();
  });

  it('should animate to search page when pathname is changed from / to /search/', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/' } }
          params={ {} }
          routes={ [{ breadcrumb: 'cpdp', breadcrumbKey: '/' }] }
        />
      </Provider>
    );

    const landingPageContent = findRenderedDOMComponentWithClass(instance, styles.landingPage);
    const searchPage = findRenderedComponentWithType(instance, SearchPage);

    landingPageContent.getAttribute('class').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.true();
    scrollToTopStub.should.not.be.called();

    stubResetBreadcrumbs.resetHistory();
    instance = reRender(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/search/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
          ] }
        />
      </Provider>,
      instance
    );

    landingPageContent.getAttribute('class').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.props.animationIn.should.be.true();
    searchPage.props.hide.should.be.false();

    stubPushBreadcrumbs.should.be.calledWith({
      location: { pathname: '/search/' },
      params: {},
      routes: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        { breadcrumb: 'Search', breadcrumbKey: 'search/' },
      ],
    });
    stubResetBreadcrumbs.should.not.be.called();
    scrollToTopStub.should.be.calledOnce();

    scrollToTopStub.restore();
  });

  it('should animate from search page to landing page when pathname is changed from /search to /', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/search/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
          ] }
        />
      </Provider>
    );

    const landingPageContent = findRenderedDOMComponentWithClass(instance, styles.landingPage);
    const searchPage = findRenderedComponentWithType(instance, SearchPage);

    landingPageContent.getAttribute('class').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.false();
    scrollToTopStub.should.not.be.called();

    stubPushBreadcrumbs.resetHistory();
    instance = reRender(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
          ] }
        />
      </Provider>,
      instance
    );

    landingPageContent.getAttribute('class').should.containEql('animation-in').and.not.containEql('hide');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.true();

    stubPushBreadcrumbs.should.not.be.called();
    stubResetBreadcrumbs.should.be.calledWith({ breadcrumbs: [] });
    scrollToTopStub.should.be.calledOnce();

    scrollToTopStub.restore();
  });

  it('should remaining show search page when pathname is changed from /search to /something-else/', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
          ] }
        />
      </Provider>
    );

    const landingPageContent = findRenderedDOMComponentWithClass(instance, styles.landingPage);
    const searchPage = findRenderedComponentWithType(instance, SearchPage);

    landingPageContent.getAttribute('class').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.true();

    scrollToTopStub.should.not.be.called();
    stubResetBreadcrumbs.should.be.calledOnce();
    stubPushBreadcrumbs.should.not.be.called();
    scrollToTopStub.resetHistory();
    stubResetBreadcrumbs.resetHistory();
    stubPushBreadcrumbs.resetHistory();

    instance = reRender(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/search/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
          ] }
        />
      </Provider>,
      instance
    );

    landingPageContent.getAttribute('class').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.props.animationIn.should.be.true();
    searchPage.props.hide.should.be.false();

    scrollToTopStub.should.be.called();
    stubResetBreadcrumbs.should.not.be.called();
    stubPushBreadcrumbs.should.be.calledOnce();
    scrollToTopStub.resetHistory();
    stubResetBreadcrumbs.resetHistory();
    stubPushBreadcrumbs.resetHistory();

    instance = reRender(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/somthing-else/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
            { breadcrumb: 'Some other page', breadcrumbKey: 'somthing-else/' },
          ] }
        />
      </Provider>,
      instance
    );

    landingPageContent.getAttribute('class').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.false();

    stubPushBreadcrumbs.should.not.be.called();
    stubResetBreadcrumbs.should.not.be.called();
    scrollToTopStub.should.be.calledOnce();

    scrollToTopStub.restore();
  });

  it('should remaining show landing page when pathname is changed from / to /something-else/', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();
    const scrollToTopStub = stub(DomUtils, 'scrollToTop');

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
          ] }
        />
      </Provider>
    );

    const landingPageContent = findRenderedDOMComponentWithClass(instance, styles.landingPage);
    const searchPage = findRenderedComponentWithType(instance, SearchPage);

    landingPageContent.getAttribute('class').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.true();
    scrollToTopStub.should.not.be.called();
    stubResetBreadcrumbs.should.be.calledOnce();

    stubResetBreadcrumbs.resetHistory();
    instance = reRender(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/somthing-else/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
            { breadcrumb: 'Some other page', breadcrumbKey: 'somthing-else/' },
          ] }
        />
      </Provider>,
      instance
    );

    landingPageContent.getAttribute('class').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.props.animationIn.should.be.false();
    searchPage.props.hide.should.be.true();

    stubPushBreadcrumbs.should.not.be.called();
    stubResetBreadcrumbs.should.not.be.called();
    scrollToTopStub.should.be.calledOnce();

    scrollToTopStub.restore();
  });

  it('should reset breadcrumbs when mounting via root path', function () {
    const stubResetBreadcrumbs = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          location={ { pathname: '/' } }
        />
      </Provider>
    );

    stubResetBreadcrumbs.should.be.calledWith({ breadcrumbs: [] });
  });

  it('should push breadcrumbs with search breadcrumb when mounting via search path', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();

    instance = renderIntoDocument(
      <Provider store={ store }>
        <LandingPage
          resetBreadcrumbs={ stubResetBreadcrumbs }
          pushBreadcrumbs={ stubPushBreadcrumbs }
          location={ { pathname: '/search/' } }
          params={ {} }
          routes={ [
            { breadcrumb: 'cpdp', breadcrumbKey: '/' },
            { breadcrumb: 'Search', breadcrumbKey: 'search/' },
          ] }
        />
      </Provider>
    );

    stubResetBreadcrumbs.should.not.be.called();
    stubPushBreadcrumbs.should.be.calledWith({
      location: { pathname: '/search/' },
      params: {},
      routes: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        { breadcrumb: 'Search', breadcrumbKey: 'search/' },
      ],
    });
  });
});
