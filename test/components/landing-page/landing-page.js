import React from 'react';
import { shallow, mount } from 'enzyme';
import { stub } from 'sinon';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import SearchPageContainer from 'containers/search-page';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import TopLawsuitsContainer from 'containers/landing-page/top-lawsuits';
import LandingPage from 'components/landing-page';
import SlimHeader from 'components/headers/slim-header';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import styles from 'components/landing-page/landing-page.sass';
import { RawOfficerCardFactory } from 'utils/test/factories/activity-grid';
import { RawDocumentCardFactory } from 'utils/test/factories/attachment';
import { ComplaintSummaryFactory } from 'utils/test/factories/complaint';
import { TopLawsuitFactory } from 'utils/test/factories/lawsuit';
import * as DomUtils from 'utils/dom';
import * as intercomUtils from 'utils/intercom';
import { HEADER_HEIGHT } from 'utils/constants';

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
    topLawsuits: {
      cards: [
        TopLawsuitFactory.build(),
        TopLawsuitFactory.build(),
      ],
    },
  },
  breadcrumb: {
    breadcrumbItems: [],
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
    pinboard: {},
  },
  toast: {},
  pathname: '/',
  pinboardIntroduction: {
    isPinButtonIntroductionVisited: false,
  },
});

describe('LandingPage component', function () {
  beforeEach(function () {
    stub(DomUtils, 'scrollToTop');
  });

  it('should be responsively renderable', function () {
    LandingPage.should.be.responsiveRenderable({
      store: store,
      helmet: true,
      withRouter: true,
    });
  });

  it('should render enough content', function () {
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/' } }
      />
    );

    wrapper.find('title').text().should.equal('CPDP');

    const landingPageContent = wrapper.find(`.${styles.landingPage}`);
    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');

    const slimHeader = wrapper.find(SlimHeader);
    slimHeader.prop('pathname').should.equal('/');

    wrapper.find(HeatMap).exists().should.be.true();
    wrapper.find(OfficersByAllegationContainer).exists().should.be.true();
    wrapper.find(RecentActivityContainer).exists().should.be.true();
    wrapper.find(RecentDocumentContainer).exists().should.be.true();
    wrapper.find(ComplaintSummariesContainer).exists().should.be.true();
    wrapper.find(TopLawsuitsContainer).exists().should.be.true();
    wrapper.find(FooterContainer).exists().should.be.true();

    const searchPage = wrapper.find(SearchPageContainer);
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();
  });

  it('should hide landing page content and show search page when pathname is /search/', function () {
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/search/' } }
        params={ {} }
      />
    );

    const landingPageContent = wrapper.find(`.${styles.landingPage}`);
    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');

    const searchPage = wrapper.find(SearchPageContainer);
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.false();
    wrapper.find(HeatMap).exists().should.be.false();
  });

  it('should able to open landing page edit mode', function () {
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/edit/' } }
        params={ {} }
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
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/edit/search/' } }
        params={ {} }
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
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/' } }
        params={ {} }
      />
    );
    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();
    DomUtils.scrollToTop.should.not.be.called();

    wrapper.setProps({
      location: { pathname: '/search/' },
      params: {},
    });

    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);
    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.true();
    searchPage.prop('hide').should.be.false();

    DomUtils.scrollToTop.should.be.calledOnce();
  });

  it('should animate from search page to landing page when pathname is changed from /search to /', function () {
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/search/' } }
        params={ {} }
      />,
      { disableLifecycleMethods: true },
    );
    wrapper.instance().componentDidMount();

    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.false();
    DomUtils.scrollToTop.should.not.be.called();

    wrapper.setProps({
      location: { pathname: '/' },
      params: {},
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();

    DomUtils.scrollToTop.should.be.calledOnce();
  });

  it('should remaining show search page when pathname is changed from /search to /something-else/', function () {
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/' } }
        params={ {} }
      />,
      { disableLifecycleMethods: true },
    );
    wrapper.instance().componentDidMount();

    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();

    DomUtils.scrollToTop.should.not.be.called();
    DomUtils.scrollToTop.resetHistory();

    wrapper.setProps({
      location: { pathname: '/search/' },
      params: {},
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.true();
    searchPage.prop('hide').should.be.false();

    DomUtils.scrollToTop.should.be.called();
    DomUtils.scrollToTop.resetHistory();

    wrapper.setProps({
      location: { pathname: '/somthing-else/' },
      params: {},
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.containEql('hide').and.not.containEql('animation-in');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.false();

    DomUtils.scrollToTop.should.not.be.called();
  });

  it('should remaining show landing page when pathname is changed from / to /something-else/', function () {
    const wrapper = shallow(
      <LandingPage
        location={ { pathname: '/' } }
        params={ {} }
      />,
      { disableLifecycleMethods: true },
    );
    wrapper.instance().componentDidMount();

    let landingPageContent = wrapper.find(`.${styles.landingPage}`);
    let searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.eql('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();

    wrapper.setProps({
      location: { pathname: '/somthing-else/' },
      params: {},
    });
    wrapper.instance().componentDidUpdate();
    landingPageContent = wrapper.find(`.${styles.landingPage}`);
    searchPage = wrapper.find(SearchPageContainer);

    landingPageContent.prop('className').should.not.containEql('animation-in').and.not.containEql('hide');
    searchPage.prop('position').should.equal('top');
    searchPage.prop('animationIn').should.be.false();
    searchPage.prop('hide').should.be.true();
  });

  it('should show intercom launcher when mounted', function () {
    stub(intercomUtils, 'showIntercomLauncher');

    mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <LandingPage
              location={ { pathname: '/' } }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );
    intercomUtils.showIntercomLauncher.should.be.calledWith(true);
  });

  it('should scroll into top lawsuits when clicking on "read the lawsuit stories"', function () {
    const scrollToTopLawsuitStub = stub(DomUtils, 'animatedScrollTo');
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <HelmetProvider>
            <LandingPage
              location={ { pathname: '/' } }
            />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    const readLawsuitStories = wrapper.find('.lawsuit-info div.info-stories');
    readLawsuitStories.simulate('click');
    scrollToTopLawsuitStub.should.be.called();
    scrollToTopLawsuitStub.should.be.calledWith('topLawsuits', { offset: -HEADER_HEIGHT });
  });
});
