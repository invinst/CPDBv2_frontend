import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DocumentMeta from 'react-document-meta';

import SearchPageContainer from 'containers/search-page';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import LandingPage from 'components/landing-page';
import SlimHeader from 'components/headers/slim-header';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import styles from 'components/landing-page/landing-page.sass';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';
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
  beforeEach(function () {
    stub(DomUtils, 'scrollToTop');
  });

  afterEach(function () {
    DomUtils.scrollToTop.restore();
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

    const wrapper = shallow(
      <LandingPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        location={ { pathname: '/' } }
      />
    );

    const documentMeta = wrapper.find(DocumentMeta).at(0);
    documentMeta.prop('title').should.equal('CPDP');

    const landingPageContent = documentMeta.find(`.${styles.landingPage}`);
    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');

    const slimHeader = documentMeta.find(SlimHeader);
    slimHeader.prop('pathname').should.equal('/');

    documentMeta.find(HeatMap).exists().should.be.true();
    documentMeta.find(OfficersByAllegationContainer).exists().should.be.true();
    documentMeta.find(RecentActivityContainer).exists().should.be.true();
    documentMeta.find(RecentDocumentContainer).exists().should.be.true();
    documentMeta.find(ComplaintSummariesContainer).exists().should.be.true();
    documentMeta.find(FooterContainer).exists().should.be.true();

    const searchPage = wrapper.find(SearchPageContainer);
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();
  });

  it('should hide landing page content and show search page when pathname is /search/', function () {
    const stubResetBreadcrumbs = spy();

    const wrapper = shallow(
      <LandingPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        location={ { pathname: '/search/' } }
        params={ {} }
        routes={ [
          { breadcrumb: 'cpdp', breadcrumbKey: '/' },
          { breadcrumb: 'Search', breadcrumbKey: 'search/' },
        ] }
      />
    );

    const landingPageContent = wrapper.find(`.${styles.landingPage}`);
    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');

    const searchPage = wrapper.find(SearchPageContainer);
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.false();
  });

  it('should able to open landing page edit mode', function () {
    const stubResetBreadcrumbs = spy();

    const wrapper = shallow(
      <LandingPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        location={ { pathname: '/edit/' } }
        params={ {} }
        routes={ [
          { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        ] }
      />
    );

    const landingPageContent = wrapper.find(`.${styles.landingPage}`);
    const searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();
  });

  it('should able to open search page edit mode', function () {
    const stubResetBreadcrumbs = spy();

    const wrapper = shallow(
      <LandingPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        location={ { pathname: '/edit/search/' } }
        params={ {} }
        routes={ [
          { breadcrumb: 'Search', breadcrumbKey: 'search/' },
          { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        ] }
      />
    );

    const landingPageContent = wrapper.find(`.${styles.landingPage}`);
    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');

    const searchPage = wrapper.find(SearchPageContainer);
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.false();
  });

  it('should animate to search page when pathname is changed from / to /search/', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();

    const wrapper = shallow(
      <LandingPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        pushBreadcrumbs={ stubPushBreadcrumbs }
        location={ { pathname: '/' } }
        params={ {} }
        routes={ [{ breadcrumb: 'cpdp', breadcrumbKey: '/' }] }
      />
    );
    wrapper.instance().componentDidMount();

    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();
    DomUtils.scrollToTop.should.not.be.called();

    stubResetBreadcrumbs.resetHistory();
    wrapper.setProps({
      resetBreadcrumbs: stubResetBreadcrumbs,
      pushBreadcrumbs: stubPushBreadcrumbs,
      location: { pathname: '/search/' },
      params: {},
      routes: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        { breadcrumb: 'Search', breadcrumbKey: 'search/' },
      ],
    });
    // TODO: enzyme 2.x don't invoke componentDidUpdate and componentDidMount.
    //  We should remove this invoke when upgrading to enzyme 3
    wrapper.instance().componentDidUpdate();

    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);
    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.true();
    searchPage.prop('hide').should.be.false();

    stubPushBreadcrumbs.should.be.called();
    stubPushBreadcrumbs.should.be.calledWith({
      location: { pathname: '/search/' },
      params: {},
      routes: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        { breadcrumb: 'Search', breadcrumbKey: 'search/' },
      ],
    });
    stubResetBreadcrumbs.should.not.be.called();
    DomUtils.scrollToTop.should.be.calledOnce();
  });

  it('should animate from search page to landing page when pathname is changed from /search to /', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();

    const wrapper = shallow(
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
    );
    wrapper.instance().componentDidMount();

    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.false();
    DomUtils.scrollToTop.should.not.be.called();

    stubPushBreadcrumbs.resetHistory();
    wrapper.setProps({
      resetBreadcrumbs: stubResetBreadcrumbs,
      pushBreadcrumbs: stubPushBreadcrumbs,
      location: { pathname: '/' },
      params: {},
      routes: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
      ],
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();

    stubPushBreadcrumbs.should.not.be.called();
    stubResetBreadcrumbs.should.be.calledWith({ breadcrumbs: [] });
    DomUtils.scrollToTop.should.be.calledOnce();
  });

  it('should remaining show search page when pathname is changed from /search to /something-else/', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();

    const wrapper = shallow(
      <LandingPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        pushBreadcrumbs={ stubPushBreadcrumbs }
        location={ { pathname: '/' } }
        params={ {} }
        routes={ [
          { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        ] }
      />
    );
    wrapper.instance().componentDidMount();

    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();

    DomUtils.scrollToTop.should.not.be.called();
    stubResetBreadcrumbs.should.be.calledOnce();
    stubPushBreadcrumbs.should.not.be.called();
    DomUtils.scrollToTop.resetHistory();
    stubResetBreadcrumbs.resetHistory();
    stubPushBreadcrumbs.resetHistory();

    wrapper.setProps({
      resetBreadcrumbs: stubResetBreadcrumbs,
      pushBreadcrumbs: stubPushBreadcrumbs,
      location: { pathname: '/search/' },
      params: {},
      routes: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        { breadcrumb: 'Search', breadcrumbKey: 'search/' },
      ],
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.true();
    searchPage.prop('hide').should.be.false();

    DomUtils.scrollToTop.should.be.called();
    stubResetBreadcrumbs.should.not.be.called();
    stubPushBreadcrumbs.should.be.calledOnce();
    DomUtils.scrollToTop.resetHistory();
    stubResetBreadcrumbs.resetHistory();
    stubPushBreadcrumbs.resetHistory();

    wrapper.setProps({
      resetBreadcrumbs: stubResetBreadcrumbs,
      pushBreadcrumbs: stubPushBreadcrumbs,
      location: { pathname: '/somthing-else/' },
      params: {},
      routes: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        { breadcrumb: 'Search', breadcrumbKey: 'search/' },
        { breadcrumb: 'Some other page', breadcrumbKey: 'somthing-else/' },
      ],
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.false();

    stubPushBreadcrumbs.should.not.be.called();
    stubResetBreadcrumbs.should.not.be.called();
    DomUtils.scrollToTop.should.be.calledOnce();
  });

  it('should remaining show landing page when pathname is changed from / to /something-else/', function () {
    const stubResetBreadcrumbs = spy();
    const stubPushBreadcrumbs = spy();

    const wrapper = shallow(
      <LandingPage
        resetBreadcrumbs={ stubResetBreadcrumbs }
        pushBreadcrumbs={ stubPushBreadcrumbs }
        location={ { pathname: '/' } }
        params={ {} }
        routes={ [
          { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        ] }
      />
    );
    wrapper.instance().componentDidMount();

    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();
    DomUtils.scrollToTop.should.not.be.called();
    stubResetBreadcrumbs.should.be.calledOnce();

    stubResetBreadcrumbs.resetHistory();
    wrapper.setProps({
      resetBreadcrumbs: stubResetBreadcrumbs,
      pushBreadcrumbs: stubPushBreadcrumbs,
      location: { pathname: '/somthing-else/' },
      params: {},
      route: [
        { breadcrumb: 'cpdp', breadcrumbKey: '/' },
        { breadcrumb: 'Search', breadcrumbKey: 'search/' },
        { breadcrumb: 'Some other page', breadcrumbKey: 'somthing-else/' },
      ],
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();

    stubPushBreadcrumbs.should.not.be.called();
    stubResetBreadcrumbs.should.not.be.called();
    DomUtils.scrollToTop.should.be.calledOnce();
  });

  it('should reset breadcrumbs when mounting via root path', function () {
    const stubResetBreadcrumbs = spy();

    mount(
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

    mount(
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
